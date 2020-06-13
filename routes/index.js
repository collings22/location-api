var express = require('express');
var router = express.Router();
var text = require('../data/project.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(text);
});

module.exports = router;
