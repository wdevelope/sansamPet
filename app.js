const express = require('express');
const app = express();
const usersRouter = require('./routes/users.route');
const petsittersRouter = require('./routes/petsitters.route');
const reservationsRouter = require('./routes/reservations.route');
const reviewsRouter = require('./routes/reviews.route');
const simanisRouter = require('./routes/simanis.route');
const cookieParser = require('cookie-parser');
const { Server } = require('http');
const passport = require('passport');

//구글
const authRoutes = require('./routes/auth.routes');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');

//구글
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
//

require('./db');

const http = Server(app);
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

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
