const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicControllers');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.post('/public/profile', apiKeyAuth, publicController.getProfile);
router.get('/public/candidate', apiKeyAuth, publicController.getCandidates);

module.exports = router;
