import { authenticate } from 'passport';
import {
  registerSchema,
  loginSchema,
} from '../validators/index';
import {
  BadRequestError,
  UnAuthorizedError,
  InternalServerError,
} from '../errors';

export default class AuthMiddleware {
  constructor(authService, userService) {
    this._authService = authService;
    this._userService = userService;
  }

  verifyUser = (req, res, next) => {
    return authenticate("jwt", { session: false })(req, res, next);
  }

  login = (req, res, next) => {
    const data = req.body;
    const { error } = loginSchema.validate(data);
    if(error) {
      return next(new BadRequestError(error.message));
    }

    return authenticate("local", { session: false }, (err, user, info) => {
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

  register = (req, res, next) => {
    const data = req.body;
    const { error } = registerSchema.validate(data);
    if(error) {
      return next(new BadRequestError(error.message));
    }

    let isEmailExist = await this._userService.emailExists(data.email);
    if(!isEmailExist) {
      return next(new UnAuthorizedError("This email already exists, please log in"));
    }
    
    next();
  }
}