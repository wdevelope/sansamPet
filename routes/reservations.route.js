const express = require('express');
const router = express.Router();

const ReservationsController = require('../controllers/reservations.controller');
const reservationsContoller = new ReservationsController();

router.get('/reservations', reservationsContoller.viewReservations);
router.post('/reservations', reservationsContoller.createReservation);
// router.patch(
//   '/reservations',
//   reservationsContoller.updateReservation,
// );
// router.delete(
//   '/reservations',
//   reservationsContoller.deleteReservation,
// );

module.exports = router;
