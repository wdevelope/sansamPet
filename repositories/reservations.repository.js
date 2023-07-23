const { Reservations, Users, Petsitters } = require('../models');

class ReservationRepository {
  createOneReservation = async (petsitterId, reservationAt, userId) => {
    const reservation = await Reservations.findOrCreate({
      where: { reservationAt, petsitterId, deletedAt: null },
      defaults: {
        petsitterId,
        reservationAt,
        userId,
      },
    });

    return reservation;
  };

  viewAllReservations = async userId => {
    const reservations = await Reservations.findAll({
      where: { userId, deletedAt: null },
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        {
          model: Petsitters,
          attributes: ['name'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });

    return reservations;
  };

  viewPetsitterReservations = async petsitterId => {
    const reservations = await Reservations.findAll({
      where: { petsitterId, deletedAt: null },
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        {
          model: Petsitters,
          attributes: ['name'],
        },
      ],
      order: [['reservationAt', 'DESC']],
    });

    return reservations;
  };

  adminViewReservations = async () => {
    const reservations = await Reservations.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
        {
          model: Petsitters,
          attributes: ['name'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });

    return reservations;
  };

  updateOneReservation = async (
    userId,
    petsitterId,
    reservationAt,
    reservationId,
  ) => {
    const existreservation = await Reservations.findOne({
      where: { petsitterId, reservationAt, deletedAt: null },
    });

    if (!existreservation || !existreservation.deletedAt) {
      const reservation = Reservations.update(
        {
          petsitterId,
          reservationAt,
        },
        {
          where: {
            reservationId,
            userId,
            deletedAt: null,
          },
        },
      );
      return reservation;
    }

    return;
  };

  deleteOneReservation = async (userId, reservationId) => {
    const reservation = await Reservations.update(
      {
        deletedAt: Date.now(),
      },
      { where: { reservationId, userId } },
    );

    return reservation;
  };

  permenantDeleteReservation = async reservationId => {
    const reservation = await Reservations.destroy({
      where: { reservationId },
    });

    return reservation;
  };
}

module.exports = ReservationRepository;
