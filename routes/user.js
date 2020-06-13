var express = require('express');
var router = express.Router();
var request = require('request');
var calculation = require('../utils/calculation.js');


//GET User by id
router.get('/:id', function(req, res, next) {
  var userId = req.params.id;

  request
    .get('https://bpdts-test-app.herokuapp.com/user/'+userId, (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      var data = JSON.parse(body);

      var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, data.latitude, data.longitude);
      data['distance'] = (distance * 0.62137).toFixed(2);

      res.send(data);
  });

});


module.exports = router;
