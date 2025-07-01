import { Router } from "express";
import { getMyProfile } from "@/src/interfaces/controllers/userController";
import { verifyTokenMiddleware } from "@/src/interfaces/middlewares/authMiddleware";
import { login, register } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../validators/loginSchema";
import passport from 'passport';
import { googleCallback } from '../controllers/googleController';
import { userSchema } from "../validators/userSchema";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyTokenMiddleware, getMyProfile);

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(userSchema), register);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failure' }),
  googleCallback
);

export default router;
