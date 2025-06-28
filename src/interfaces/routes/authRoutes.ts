import { Router } from "express";
import { login } from "../controllers/authController";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../validators/loginSchema";
import passport from 'passport';
import { googleCallback } from '../controllers/googleController';

const router = Router();
router.post("/login", validate(loginSchema), login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failure' }),
  googleCallback
);

export default router;
