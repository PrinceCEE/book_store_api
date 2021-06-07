const passport = require('passport');
const {
  registerSchema,
  loginSchema,
} = require('../validators');
const {
  BadRequestError,
  UnAuthorizedError,
  InternalServerError,
} = require('../errors');

class AuthMiddleware {
  constructor(authService, userService) {
    this._authService = authService;
    this._userService = userService;
  }

  verifyUser = (req, res, next) => {
    return passport.authenticate(
      "jwt",
      { session: false },
    )(req, res, next);
  }

  login = (req, res, next) => {
    const data = req.body;
    const { error } = loginSchema.validate(data);
    if(error) {
      return next(new BadRequestError(error.message));
    }

    return passport.authenticate(
      "local",
      { session: false },
      (err, user, info) => {
        if(err) {
          return next(new InternalServerError());
        }
        
        if(!user) {
          return next(new BadRequestError(info.message));
        }

        req.logIn(user, { session: false }, err => {
          if(err) {
            return next(new InternalServerError());
          }

          next();
        });
    })(req, res, next);
  }

  register = async (req, res, next) => {
    const data = req.body;
    const { error } = registerSchema.validate(data);
    if(error) {
      return next(new BadRequestError(error.message));
    }

    let emailExist = await this._userService.emailExists(data.email);
    if(emailExist) {
      return next(new UnAuthorizedError("This email already exists, please log in"));
    }
    
    next();
  }
}

module.exports = AuthMiddleware;