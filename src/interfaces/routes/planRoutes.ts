import { Router } from "express";
import { validate } from "../middlewares/validate";
import { planSchema } from "../validators/planSchema";
import { create } from "../controllers/planController";

const router = Router();
router.post('/create', validate(planSchema), create);
export default router