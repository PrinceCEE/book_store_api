import { use } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// local strategy
use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  }, (username, password, done) => {

  },
));

// jwt strategy
use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (payload, done) => {

  },
));