import { Request, Response } from "express";
import { AssociationRepository } from "@/src/infrastructure/repositories/AssociationRepository";
import { getAssociationById } from "@/src/application/use-cases/getAssociationById";
import { getAllAssociations } from "@/src/application/use-cases/getAllAssociations";
import { getAssociationByOwnerId } from "@/src/application/use-cases/getAssociationByOwnerId";
import { getBase64Image } from "@/src/infrastructure/services/getBase64Image";
import { GetAssociationStats } from "@/src/application/use-cases/GetAssociationStats";
import { PlanRepository } from "@/src/infrastructure/repositories/PlanRepository";
import { UserPlanRepository } from "@/src/infrastructure/repositories/UserPlanRepository";
import { ReviewRepository } from "@/src/infrastructure/repositories/ReviewRepository";

export const getAssociationByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const association = await getAssociationById(AssociationRepository)(id);
  if (!association) {
    res.status(404).json({ error: "Association not found" });
    return;
  }
  if (association.image_url) {
    association.image_url = getBase64Image(association.image_url);
  }
  res.json(association);
};

export const getAllAssociationsController = async (_req: Request, res: Response) => {
  const associations = await getAllAssociations(AssociationRepository)();
  associations.forEach(a => {
    if (a.image_url) {
      a.image_url = getBase64Image(a.image_url);
    }
  });
  res.json(associations);
};

export const getMyAssociationController = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.id as string | undefined;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const association = await getAssociationByOwnerId(AssociationRepository)(userId as string);
  if (!association) {
    res.status(404).json({ error: "Association not found" });
    return;
  }
  if (association.image_url) {
    association.image_url = getBase64Image(association.image_url);
  }
  res.json(association);
};

export const getAssociationStatsController = async (req: Request, res: Response) => {
  try {
    const { associationId } = req.params;
    // Fetch the association to check ownership
    const association = await AssociationRepository.findById(associationId);
    if (!association) {
      res.status(404).json({ success: false, message: 'Association not found' });
      return;
    }
    const user = (req as any).user;
    if (!user || user.role !== 'associationOwner' || user.id !== association.owner_id) {
      res.status(403).json({ success: false, message: 'Forbidden: Only the association owner can view stats' });
      return;
    }
    const stats = await GetAssociationStats(
      AssociationRepository,
      PlanRepository,
      UserPlanRepository,
      ReviewRepository
    )(associationId);
    res.status(200).json({
      success: true,
      data: stats,
      message: 'Association stats retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting association stats:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}; 