var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js').GetUserById;

//GET User by id
router.get('/:id', userController);


module.exports = router;
