import { Router } from "express";
import { registerUser, updateMyProfile, deleteMyProfile, getMyProfile } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { userSchema } from "../validators/userSchema";
import { verifyTokenMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post('/', verifyTokenMiddleware, validate(userSchema), registerUser);
router.get('/me', verifyTokenMiddleware, getMyProfile);
router.put('/me', verifyTokenMiddleware, updateMyProfile);
router.delete('/me', verifyTokenMiddleware, deleteMyProfile);
export default router