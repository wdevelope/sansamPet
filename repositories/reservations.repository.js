const { Reservations, Users, Petsitters } = require('../models');
const { Op } = require('sequelize');

class ReservationRepository {
  createOneReservation = async (petsitterId, reservationAt, userID) => {
    const reservation = await Reservations.findOrCreate({
      where: { reservationAt, petsitterId },
      defaults: {
        petsitterId,
        reservationAt,
        userID,
      },
    });
    return reservation;
  };

  viewAllReservations = async userID => {
    const reservations = await Reservations.findAll({
      where: { userID, isDelete: 0 },
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
    userID,
    petsitterId,
    reservationAt,
    reservationId,
  ) => {
    const existreservation = await Reservations.findOne({
      where: { petsitterId, reservationAt },
    });

    if (!existreservation) {
      const reservation = Reservations.update(
        {
          petsitterId,
          reservationAt,
        },
        {
          where: {
            reservationId,
            userID,
            isDelete: 0,
          },
        },
      );
      return reservation;
    }
    return false;
  };
  deleteOneReservation = async (userID, reservationId) => {
    const reservation = await Reservations.update(
      {
        isDelete: 1,
        deletedAt: new Date(),
      },
      { where: { reservationId, userID, isDelete: 0 } },
    );
    return reservation;
  };
  permenantDeleteReservation = async reservationId => {
    const reservation = await Reservations.destroy({
      where: { reservationId, isDelete: 1 },
    });
    return reservation;
  };
}

module.exports = ReservationRepository;
