const SimaniService = require('../services/simanis.service');

class SimanisController {
  simaniService = new SimaniService();

  viewSimanis = async (req, res) => {
    const { userId } = res.locals;
    const { status, message, simanis } = await this.simaniService.viewSimanis(
      userId,
    );
    return res.status(status).json({ message, simanis });
  };

  createSimani = async (req, res) => {
    const { userId } = res.locals;
    const { name, imgurl, signInCareer, description } = req.body;
    const { status, message } = await this.simaniService.createSimani(
      name,
      imgurl,
      signInCareer,
      description,
      userId,
    );
    return res.status(status).json({ message });
  };

  editSimani = async (req, res) => {
    const { userId } = res.locals;
    const { name, imgurl, signInCareer, description } = req.body;
    const { petsitterId } = req.query;

    const { status, message } = await this.simaniService.editSimani(
      name,
      imgurl,
      signInCareer,
      description,
      userId,
      petsitterId,
    );
    return res.status(status).json({ message });
  };

  deleteSimani = async (req, res) => {
    const { userId } = res.locals;
    const { petsitterId } = req.query;

    const { status, message } = await this.simaniService.deleteSimani(
      userId,
      petsitterId,
    );
    return res.status(status).json({ message });
  };

  superDeleteSimani = async (req, res) => {
    const { userId } = res.locals;
    const { petsitterId } = req.query;
    const { status, message } = await this.simaniService.superDeleteSimani(
      userId,
      petsitterId,
    );
    return res.status(status).json({ message });
  };
}

module.exports = SimanisController;
