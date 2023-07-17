const { Reservations, Users, Petsitters } = require('../models');

class ReservationRepository {
  createOneReservation = async (petsitter_id, reservationAt, user_id) => {
    const reservation = await Reservations.create({
      petsitter_id,
      reservationAt,
      user_id,
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
    const reservation = await Reservations.update(
      {
        petsitter_id,
        reservationAt,
      },
      { where: { reservation_id, user_id, isDelete: 0 } },
    );
    return reservation;
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
