import { Router } from "express";
import { login } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../validators/loginSchema";

const router = Router();
router.post("/login", validate(loginSchema), login);
export default router;
