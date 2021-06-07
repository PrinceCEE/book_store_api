import { use } from 'passport';
import { compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userService from './services/user.service';

// local strategy
use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    const user = await userService.getUserByEmail(email);
    if(!user) {
      return done(null, false, {
        message: "Invalid email"
      });
    }

    const isPwdSame = await compare(password, user.password);
    if(!isPwdSame) {
      return done(null, false, {
        message: "Invalid login details"
      });
    }

    return done(null, user);
  },
));

// jwt strategy
use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (payload, done) => {
    let user = await userService.getUserbyId(payload.sub);
    if(!user) {
      return done(null, false);
    }
    return done(null, user);
  },
));