import { Router } from "express";
import { registerUser } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/userSchema";

const router = Router();
router.post('/', validate(userSchema),registerUser);
export default router