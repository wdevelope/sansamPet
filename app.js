const express = require('express');
const usersRouter = require('./routes/users.route');
const petsittersRouter = require('./routes/petsitters.route');
const reservationsRouter = require('./routes/reservations.route');
const reviewsRouter = require('./routes/reviews.route');
const simanisRouter = require('./routes/simanis.route');
const cookieParser = require('cookie-parser');
const { Server } = require('http');
const passport = require('passport');
const naverStrategy = require('passport-naver').Strategy;
const UserService = require('./services/user.service');
require('./db');

const app = express();
const http = Server(app);
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

passport.use(
  new naverStrategy(
    {
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/naver/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await UserService.registerOrLoginWithNaver(profile);
        done(null, user.id);
      } catch (error) {
        done(error);
      }
    },
  ),
);

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(passport.initialize());

app.use('/api', [
  usersRouter,
  petsittersRouter,
  reservationsRouter,
  reviewsRouter,
  simanisRouter,
]);
app.use(express.static('public'));

module.exports = http;

// 테스트
