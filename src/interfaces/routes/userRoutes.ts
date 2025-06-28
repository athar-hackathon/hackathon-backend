import { Router } from "express";
import { registerUser } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/userSchema";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post('/', verifyTokenMiddleware, validate(userSchema), registerUser);
export default router