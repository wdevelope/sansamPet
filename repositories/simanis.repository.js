const { Petsitters } = require('../models');

class SimaniRepository {
  createSimani = async (name, imgurl, signInCareer, description) => {
    const simani = await Petsitters.create({
      name,
      imgurl,
      signInCareer,
      description,
    });
    return simani;
  };

  viewSimanis = async () => {
    const simanis = await Petsitters.findAll({
      where: { deletedAt: null },
    });
    return simanis;
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
      where: { petsitterId, reservationAt },
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
    const now = new Date();
    const reservation = await Reservations.update(
      {
        deletedAt: now,
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

module.exports = SimaniRepository;
