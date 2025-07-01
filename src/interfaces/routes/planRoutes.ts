import { Router } from "express";
import {
  filterPlans,
  getAllPlansController,
  getPlanByIdController,
  create,
  getPlansByCategoryNameController,
  updatePlanController,
  deletePlanController
} from "../controllers/planController";
import { validate } from "../middlewares/validate";
import { planSchema } from "../validators/planSchema";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware";
const router = Router();

router.get("/", verifyTokenMiddleware, getAllPlansController);

// Get plans by category name
router.get("/category/:categoryName", getPlansByCategoryNameController);

// Filter plans by categories and fees
router.get("/filter", filterPlans);

router.get("/:id", getPlanByIdController);

router.post("/create", validate(planSchema), create);

// Association owner routes for updating and deleting their plans
router.put("/:id", verifyTokenMiddleware, updatePlanController);
router.delete("/:id", verifyTokenMiddleware, deletePlanController);

export default router;
