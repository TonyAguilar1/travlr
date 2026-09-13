var express = require('express');
var router = express.Router();
const crtMain = require('../controllers/main');

/* GET home page. */
router.get('/', crtMain.index);

/* GET travel page. */
router.get('/travel', crtTravel.travel);

module.exports = router;
