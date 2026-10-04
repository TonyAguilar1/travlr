const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router
    .route('/trips')
    .get(tripsController.tripList);

//Get method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;