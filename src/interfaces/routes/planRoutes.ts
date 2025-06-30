import { Router } from "express";
import {
  filterPlans,
  getAllPlansController,
  getPlanByIdController,
  create,
  getPlansByCategoryNameController
} from "../controllers/planController";
import { planFilterQuerySchema } from "../validators/planFilterSchema";
import { validate } from "../middlewares/validate";
import { planSchema } from "../validators/planSchema";
const router = Router();

router.get("/", getAllPlansController);

// Get plans by category name
router.get("/category/:categoryName", getPlansByCategoryNameController);

// Filter plans by categories and fees
router.get("/filter", filterPlans);

router.get("/:id", getPlanByIdController);

router.post("/create", validate(planSchema), create);

export default router;
