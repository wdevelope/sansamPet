const ReservationService = require('../services/reservations.service');

class ReservationsController {
  reservationService = new ReservationService();

  createReservation = async (req, res) => {
    const { petsitter_id, reservationAt, user_id } = req.body;

    const { status, message } =
      await this.reservationService.createOneReservation(
        petsitter_id,
        reservationAt,
        user_id,
      );
    return res.status(status).json({ message });
  };
  viewReservations = async (req, res) => {
    const { user_id } = req.body;

    const { status, message, reservations } =
      await this.reservationService.viewAllReservations(user_id);
    return res.status(status).json({ message, reservations });
  };
}

module.exports = ReservationsController;
