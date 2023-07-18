const express = require('express');
const usersRouter = require('./routes/users.route');
const petsittersRouter = require('./routes/petsitters.route');
const reservationsRouter = require('./routes/reservations.route');
const reviewsRouter = require('./routes/reviews.route');
const simanisRouter = require('./routes/simanis.route');
const cookieParser = require('cookie-parser');
const { Server } = require('http');
require('./db');

const app = express();
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
