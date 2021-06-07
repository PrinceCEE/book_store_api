import { Router } from 'express';
import userRoutes from '../routes/user.route';
import AuthMiddleware from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = Router();
const authMiddleware = new AuthMiddleware();
const userController = new UserController();

// retrieves a user's details
router.get(
  userRoutes.userPage,
  authMiddleware.verifyUser,
  userController.userPage,
);

// view a users books
router.get(
  userRoutes.viewMyBooks,
  authMiddleware.verifyUser,
  userController.viewMyBooks,
);

router.path = "/user";

export default router;