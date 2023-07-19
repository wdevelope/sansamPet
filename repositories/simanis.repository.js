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

  editSimani = async (name, imgurl, signInCareer, description) => {
    const simani = Petsitters.update(
      {
        name,
        imgurl,
        signInCareer,
        description,
      },
      {
        where: {
          name,
          deletedAt: null,
        },
      },
    );
    return simani;
  };
  deleteSimani = async name => {
    const now = new Date();
    const simani = await Petsitters.update(
      {
        deletedAt: now,
      },
      { where: { name } },
    );
    return simani;
  };
  superDeleteSimani = async name => {
    const simani = await Petsitters.destroy({
      where: { name },
    });
    return simani;
  };
}

module.exports = SimaniRepository;
