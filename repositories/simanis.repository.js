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

  editSimani = async (name, imgurl, signInCareer, description, petsitterId) => {
    const simani = Petsitters.update(
      {
        name,
        imgurl,
        signInCareer,
        description,
      },
      {
        where: {
          petsitterId,
          deletedAt: null,
        },
      },
    );
    return simani;
  };
  deleteSimani = async petsitterId => {
    const now = new Date();
    const simani = await Petsitters.update(
      {
        deletedAt: now,
      },
      { where: { petsitterId } },
    );
    return simani;
  };
  superDeleteSimani = async petsitterId => {
    const simani = await Petsitters.destroy({
      where: { petsitterId },
    });
    return simani;
  };
}

module.exports = SimaniRepository;
