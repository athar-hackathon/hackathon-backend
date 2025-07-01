import { Router } from "express";
import { getAssociationByIdController, getAllAssociationsController, getMyAssociationController, getAssociationStatsController } from "@/src/interfaces/controllers/associationController";
import { verifyTokenMiddleware } from "@/src/interfaces/middlewares/authMiddleware";

const router = Router();

router.get("/", getAllAssociationsController);
router.get("/me", verifyTokenMiddleware, getMyAssociationController);
router.get("/:id", getAssociationByIdController);
router.get("/:associationId/stats", verifyTokenMiddleware, getAssociationStatsController);

export default router;