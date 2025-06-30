import { Request, Response } from "express";
import { AssociationRepository } from "@/src/infrastructure/repositories/AssociationRepository";
import { getAssociationById } from "@/src/application/use-cases/getAssociationById";
import { getAllAssociations } from "@/src/application/use-cases/getAllAssociations";
import { getAssociationByOwnerId } from "@/src/application/use-cases/getAssociationByOwnerId";
import { getBase64Image } from "@/src/infrastructure/services/getBase64Image";

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