const { Router } = require('express');
const authoutes = require('../routes/auth.route');
const AuthMiddleware = require('../middlewares/auth.middleware');
const AuthController = require('../controllers/auth.controller');
const userService = require('../services/user.service');
const authService = require('../services/auth.service');

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

module.exports = router;