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
      where: user_id,
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
}

module.exports = ReservationRepository;
