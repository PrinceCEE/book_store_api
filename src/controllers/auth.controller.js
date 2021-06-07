export default class AuthController {
  constructor(authService, userService) {
    this._authService = authService;
    this._userService = userService;
  }

  login = (req, res, next) => {
    const user = req.user;
    const accessToken = this._authService.getToken({
      email: user.email,
      sub: user.id,
    });

    res.json({
      success: true,
      data: "Successful sign in",
      accessToken,
    });
  }

  register = async (req, res, next) => {
    const data = req.body;
    const password = data.password;
    const user = await this._userService.createNewUser(data);

    // redirect to the login for sign in
    req.originalUrl = '/auth/login';
    req.method = 'POST';
    req.url = '/auth/login';
    req.body = {
      email: user.email,
      password,
    };
    req.app.handle(req, res);
  }
}