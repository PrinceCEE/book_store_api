import { Router } from 'express';
import authoutes from '../routes/auth.route';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';
import userService from '../services/user.service';
import authService from '../services/auth.service';

const router = Router();
const authMiddelware = new AuthMiddleware(
  authService,
  userService,
);
const authController = new AuthController(
  authService,
  userService,
);

router.post(
  authoutes.login,
  authMiddelware.login,
  authController.login,
);

router.post(
  authoutes.register,
  authMiddelware.register,
  authController.register,
);

router.path = "/auth";

export default router;