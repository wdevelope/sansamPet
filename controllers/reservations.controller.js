const ReservationService = require('../services/reservations.service');

class ReservationsController {
  reservationService = new ReservationService();

  createReservation = async (req, res) => {
    const { user_id, petsitter_id, reservationAt } = req.body;
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
  updateReservation = async (req, res) => {
    const { user_id, petsitter_id, reservationAt } = req.body;
    const { reservation_id } = req.query;

    const { status, message } =
      await this.reservationService.updateOneReservation(
        user_id,
        petsitter_id,
        reservationAt,
        reservation_id,
      );
    return res.status(status).json({ message });
  };
  deleteReservation = async (req, res) => {
    const { user_id } = req.body;
    const { reservation_id } = req.query;

    const { status, message } =
      await this.reservationService.deleteOneReservation(
        user_id,
        reservation_id,
      );
    return res.status(status).json({ message });
  };
  permenantDeleteReservation = async (req, res) => {
    const { user_id } = req.body;
    const { reservation_id } = req.query;
    const { status, message } =
      await this.reservationService.permenantDeleteReservation(
        user_id,
        reservation_id,
      );
    return res.status(status).json({ message });
  };
}

module.exports = ReservationsController;
