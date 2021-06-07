const { Router } = require('express');
const userRoutes = require('../routes/user.route');
const AuthMiddleware = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

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

module.exports = router;