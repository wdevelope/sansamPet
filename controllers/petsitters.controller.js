const PetsitterService = require('../services/petsitters.service');

class PetsittersController {
  petsitterService = new PetsitterService();

  viewallpesitters = async (req, res) => {
    const { status, message, petsitters } =
      await this.petsitterService.viewallpesitters();
    return res.status(status).json({ message, petsitters });
  };

  viewonepetsitter = async (req, res) => {
    const { petsitterId } = req.params;
    const { status, message, petsitter } =
      await this.petsitterService.viewonepetsitter(petsitterId);
    return res.status(status).json({ message, petsitter });
  };

  viewonepetsitterbynickname = async (req, res) => {
    const { name } = req.body;
    const { status, message, petsitter } =
      await this.petsitterService.viewonepetsitterbynickname(name);
    return res.status(status).json({ message, petsitter });
  };
}

module.exports = PetsittersController;
