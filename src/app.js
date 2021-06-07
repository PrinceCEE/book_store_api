const express = require('express');
const passport = require('passport');
const { json, urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Logger = require('morgan');
const Helmet = require('helmet');
const userRouter = require('./routers/user.router');
const bookRouter = require('./routers/book.router');
const authRouter = require('./routers/auth.router');
const { localStrategy, jwtStrategy } = require('./strategies');

const app = express();

// initialise strategies
localStrategy();
jwtStrategy();

// initialise the route-wide middlewares
app.use(Helmet());
app.use(Logger("dev"));
app.use(passport.initialize());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  credentials: true,
  origin: "*",
  methods: [
    "GET",
    "POST",
  ],
  allowedHeaders: [
    "X-Requested-With",
    "X-HTTP-Method-Override",
    "Content-Type",
    "Accept",
    "Authorization"
  ]
}));

// set up the routers and nount them using their defined path
app.use(authRouter.path, authRouter);
app.use(userRouter.path, userRouter);
app.use(bookRouter.path, bookRouter);

// catch all Http errors
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    data: err.message,
  });
});

// catch all 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    data: "Not found",
  });
});

module.exports = app;