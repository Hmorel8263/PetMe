const express = require('express');
const donationController = require('../controller/donationController');

const router = express.Router();

router.post('/', donationController.makeDonation);

module.exports = router;