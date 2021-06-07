export default class AuthController {
  constructor(authService, userService) {
    this._authService = authService;
    this._userService = userService;
  }

  login = (req, res, next) => {}

  register = (req, res, next) => {}
}