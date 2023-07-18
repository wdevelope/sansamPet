const ReservationService = require('../services/reservations.service');

class ReservationsController {
  reservationService = new ReservationService();

  createReservation = async (req, res) => {
    const { userID } = res.locals;
    const { petsitterId, reservationAt } = req.body;
    const { status, message } =
      await this.reservationService.createOneReservation(
        petsitterId,
        reservationAt,
        userID,
      );
    return res.status(status).json({ message });
  };
  viewReservations = async (req, res) => {
    const { userID } = res.locals;
    const { status, message, reservations } =
      await this.reservationService.viewAllReservations(userID);
    return res.status(status).json({ message, reservations });
  };
  updateReservation = async (req, res) => {
    const { userID } = res.locals;
    const { petsitterId, reservationAt } = req.body;
    const { reservationId } = req.query;

    const { status, message } =
      await this.reservationService.updateOneReservation(
        userID,
        petsitterId,
        reservationAt,
        reservationId,
      );
    return res.status(status).json({ message });
  };
  deleteReservation = async (req, res) => {
    const { userID } = res.locals;
    const { reservationId } = req.query;

    const { status, message } =
      await this.reservationService.deleteOneReservation(userID, reservationId);
    return res.status(status).json({ message });
  };
  permenantDeleteReservation = async (req, res) => {
    const { userID } = res.locals;
    const { reservationId } = req.query;
    const { status, message } =
      await this.reservationService.permenantDeleteReservation(
        userID,
        reservationId,
      );
    return res.status(status).json({ message });
  };
}

module.exports = ReservationsController;
