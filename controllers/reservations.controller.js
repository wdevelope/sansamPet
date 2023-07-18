const ReservationService = require('../services/reservations.service');

class ReservationsController {
  reservationService = new ReservationService();

  viewPetsitterReservations = async (req, res) => {
    const { petsitterId } = req.params;
    const { status, message, reservations } =
      await this.reservationService.viewPetsitterReservations(petsitterId);
    return res.status(status).json({ message, reservations });
  };

  createReservation = async (req, res) => {
    const { userId } = res.locals;
    const { petsitterId, reservationAt } = req.body;
    const { status, message } =
      await this.reservationService.createOneReservation(
        petsitterId,
        reservationAt,
        userId,
      );
    return res.status(status).json({ message });
  };
  viewReservations = async (req, res) => {
    const { userId } = res.locals;
    const { status, message, reservations } =
      await this.reservationService.viewAllReservations(userId);
    return res.status(status).json({ message, reservations });
  };
  adminViewReservations = async (req, res) => {
    const { status, message, reservations } =
      await this.reservationService.adminViewReservations();
    return res.status(status).json({ message, reservations });
  };
  updateReservation = async (req, res) => {
    const { userId } = res.locals;
    const { petsitterId, reservationAt } = req.body;
    const { reservationId } = req.query;

    const { status, message } =
      await this.reservationService.updateOneReservation(
        userId,
        petsitterId,
        reservationAt,
        reservationId,
      );
    return res.status(status).json({ message });
  };
  deleteReservation = async (req, res) => {
    const { userId } = res.locals;
    const { reservationId } = req.query;

    const { status, message } =
      await this.reservationService.deleteOneReservation(userId, reservationId);
    return res.status(status).json({ message });
  };
  permenantDeleteReservation = async (req, res) => {
    const { userId } = res.locals;
    const { reservationId } = req.query;
    const { status, message } =
      await this.reservationService.permenantDeleteReservation(
        userId,
        reservationId,
      );
    return res.status(status).json({ message });
  };
}

module.exports = ReservationsController;
