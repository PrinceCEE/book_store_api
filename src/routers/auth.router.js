import { Router } from 'express';
import authoutes from '../routes/auth.route';
import AuthMiddleware from '../middlewares/auth.middleware';
import AuthController from '../controllers/auth.controller';

const router = Router();
const authMiddelware = new AuthMiddleware();
const authController = new AuthController();

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