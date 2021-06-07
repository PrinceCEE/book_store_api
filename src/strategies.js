const passport = require('passport')
const { compare } = require('bcrypt');
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt');
const userService = require('./services/user.service');

// local strategy
exports.localStrategy = () => passport.use(new LocalStrategy.Strategy(
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
exports.jwtStrategy = () => passport.use(new JwtStrategy.Strategy(
  {
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, async (payload, done) => {
    let user = await userService.getUserbyId(payload.sub);
    if(!user) {
      return done(null, false);
    }
    return done(null, user);
  },
));