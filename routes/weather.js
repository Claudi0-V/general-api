const router = require("express").Router();

const weatherController = require('../controllers/weatherController.js')
//console.log(weatherController);
router.get('/', weatherController)

module.exports = router