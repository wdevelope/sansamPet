const express = require('express');
const router = express.Router();

const authmiddleware = require('../middlewares/auth-middleware.js');
const SimanisController = require('../controllers/simanis.controller');
const simanisContoller = new SimanisController();

router.get('/admin/simanis', authmiddleware, simanisContoller.viewSimanis);
router.post('/admin/simanis', authmiddleware, simanisContoller.createSimani);
router.patch('/admin/simanis', authmiddleware, simanisContoller.editSimani);
router.delete('/admin/simanis', authmiddleware, simanisContoller.deleteSimani);
router.delete(
  '/superadmin/simanis',
  authmiddleware,
  simanisContoller.superDeleteSimani,
);

module.exports = router;
