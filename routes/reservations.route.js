const express = require('express');
const router = express.Router();

const authmiddleware = require('../middlewares/auth-middleware.js');
const ReservationsController = require('../controllers/reservations.controller');
const reservationsContoller = new ReservationsController();

router.get(
  '/reservations',
  authmiddleware,
  reservationsContoller.viewReservations,
);
router.post(
  '/reservations',
  authmiddleware,
  reservationsContoller.createReservation,
);
router.patch(
  '/reservations',
  authmiddleware,
  reservationsContoller.updateReservation,
);
router.delete(
  '/reservations',
  authmiddleware,
  reservationsContoller.deleteReservation,
);
router.delete(
  '/admin/reservations',
  authmiddleware,
  reservationsContoller.permenantDeleteReservation,
);
module.exports = router;
