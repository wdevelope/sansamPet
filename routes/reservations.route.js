const express = require('express');
const router = express.Router();

const authmiddleware = require('../middlewares/auth-middleware.js');
const ReservationsController = require('../controllers/reservations.controller');
const reservationsContoller = new ReservationsController();

router.get('/reservations', reservationsContoller.viewReservations);
router.get(
  '/reservations/petsitters/:petsitter_id',
  reservationsContoller.viewReservations,
);
router.post('/reservations', reservationsContoller.createReservation);
router.patch('/reservations', reservationsContoller.updateReservation);
router.delete('/reservations', reservationsContoller.deleteReservation);
router.delete(
  '/admin/reservations',
  reservationsContoller.permenantDeleteReservation,
);
module.exports = router;
