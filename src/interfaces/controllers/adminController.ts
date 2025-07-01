import { Request, Response } from 'express';
import { approveAssociation } from '../../application/use-cases/ApproveAssociation';
import { rejectAssociation } from '../../application/use-cases/RejectAssociation';
import { getPendingAssociations } from '../../application/use-cases/GetPendingAssociations';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { deletePlan } from '../../application/use-cases/DeletePlan';
import { PlanRepository } from '../../infrastructure/repositories/PlanRepository';
import { GetAdminStats } from '../../application/use-cases/GetAdminStats';
import { AssociationRepository } from '../../infrastructure/repositories/AssociationRepository';
import { CategoryRepository } from '../../infrastructure/repositories/CategoryRepository';
import { ReviewRepository } from '../../infrastructure/repositories/ReviewRepository';
import { db } from "../../infrastructure/db/sequelize";

export const getPendingAssociationsController = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Find all users who are pending association owners
    const pendingOwners = await db.user.findAll({
      where: { isActive: false, role: "associationOwner" },
      attributes: ["id", "name"]
    });

    // 2. For each user, find their association
    const associations = await Promise.all(
      pendingOwners.map(async (user: any) => {
        const association = await db.association.findOne({
          where: { owner_id: user.id }
        });
        if (association) {
          const data = association.get();
          return {
            ...data,
            owner: { id: user.id, name: user.name }
          };
        }
        return null;
      })
    );

    // Filter out users with no association
    const result = associations.filter(a => a !== null);

    res.status(200).json({
      success: true,
      data: result,
      message: "Pending associations retrieved successfully"
    });
  } catch (error) {
    console.error("Error getting pending associations:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error"
    });
  }
};

export const approveAssociationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const result = await approveAssociation(UserRepository)(userId);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result.user,
      message: 'Association approved successfully'
    });
  } catch (error) {
    console.error('Error approving association:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const rejectAssociationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;
    const result = await rejectAssociation(UserRepository)(userId, reason);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: result.user,
      message: 'Association rejected successfully'
    });
  } catch (error) {
    console.error('Error rejecting association:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const deletePlanController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: planId } = req.params;
    const { reason } = req.body;
    // @ts-ignore
    const adminId = req.user.id; 

    const result = await deletePlan(PlanRepository, UserRepository, AssociationRepository)(planId, adminId, reason);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: result.error
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
      planId,
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getAdminStatsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await GetAdminStats(
      UserRepository,
      AssociationRepository,
      PlanRepository,
      CategoryRepository,
      ReviewRepository
    )();
    res.status(200).json({
      success: true,
      data: stats,
      message: 'Admin stats retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting admin stats:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
}; 