import express from 'express';
import { initialize } from 'passport';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Logger from 'morgan';
import Helmet from 'helmet';
import userRouter from './routers/user.router';
import bookRouter from './routers/book.router';
import authRouter from './routers/auth.router';

const app = express();

// initialise the route-wide middlewares
app.use(Helmet());
app.use(Logger("dev"));
app.use(initialize());
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

});

// catch all 404 errors
app.use((req, res, next) => {

});

export default app;