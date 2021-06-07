export default class AuthMiddleware {
  constructor(authService, userService) {
    this._authService = authService;
    this._userService = userService;
  }

  verifyUser = (req, res, next) => {}

  login = (req, res, next) => {}

  register = (req, res, next) => {}
}