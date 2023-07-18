const { Reservations, Users, Petsitters } = require('../models');
const { Op } = require('sequelize');

class ReservationRepository {
  createOneReservation = async (petsitter_id, reservationAt, user_id) => {
    const reservation = await Reservations.findOrCreate({
      where: { reservationAt, petsitter_id },
      defaults: {
        petsitter_id,
        reservationAt,
        user_id,
      },
    });
    return reservation;
  };

  viewAllReservations = async user_id => {
    const reservations = await Reservations.findAll({
      where: { user_id, isDelete: 0 },
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
    });
    return reservations;
  };
  updateOneReservation = async (
    user_id,
    petsitter_id,
    reservationAt,
    reservation_id,
  ) => {
    const existreservation = await Reservations.findOne({
      where: { petsitter_id, reservationAt },
    });

    if (!existreservation) {
      const reservation = Reservations.update(
        {
          petsitter_id,
          reservationAt,
        },
        {
          where: {
            reservation_id,
            user_id,
            isDelete: 0,
          },
        },
      );
      return reservation;
    }
    return false;
  };
  deleteOneReservation = async (user_id, reservation_id) => {
    const reservation = await Reservations.update(
      {
        isDelete: 1,
        deletedAt: new Date(),
      },
      { where: { reservation_id, user_id, isDelete: 0 } },
    );
    return reservation;
  };
  permenantDeleteReservation = async reservation_id => {
    const reservation = await Reservations.destroy({
      where: { reservation_id, isDelete: 1 },
    });
    return reservation;
  };
}

module.exports = ReservationRepository;
