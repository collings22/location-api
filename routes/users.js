var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');

//GET Users witin 50 miles of london
router.get('/', userController.GetUsersInLondonRadius);

//GET Users witin 50 miles of userId
router.get('/near/:id', userController.GetUsersInRadiusOfUserId);

//GET Users witin 50 miles (by default) of a location
//accepts params for latitude, longitude and radius.
router.get('/near', userController.GetUsersInRadiusOfLocation);

module.exports = router;
