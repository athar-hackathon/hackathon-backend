import { Router } from "express";
import { getAssociationByIdController, getAllAssociationsController, getMyAssociationController } from "@/src/interfaces/controllers/associationController";
import { verifyTokenMiddleware } from "@/src/interfaces/middlewares/authMiddleware";

const router = Router();

router.get("/", getAllAssociationsController);
router.get("/me", verifyTokenMiddleware, getMyAssociationController);
router.get("/:id", getAssociationByIdController);

export default router;