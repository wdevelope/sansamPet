const express = require('express');
const router = express.Router();

const PetsittersController = require('../controllers/petsitters.controller.js');
const petsittersContoller = new PetsittersController();

router.get('/petsitters', petsittersContoller.viewallpesitters);
router.get('/petsitters/:petsitterId', petsittersContoller.viewonepetsitter);
router.get('/petsitterssearch', petsittersContoller.viewonepetsitterbynickname);
module.exports = router;
