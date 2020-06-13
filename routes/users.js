var express = require('express');
var router = express.Router();
var request = require('request');
const calculation = require('../utils/calculation');

//GET Users witin 50 miles
router.get('/', function(req, res, next) {
  const radius = (50 * 1.609344);

  request
    .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      var data = JSON.parse(body);

      var arr =  data.filter(function(person) {
        var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude);
        distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
        return distance <= radius;
      }).sort((a,b) => { return a.distance - b.distance; });

      res.send(arr);
  });

});

//GET Users witin 50 miles of userId
router.get('/near/:id', function(req, res, next) {
  const radius = (50 * 1.609344);
  var userId = req.params.id;

  request
    .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      var data = JSON.parse(body);
      var copy = Object.assign([],data);
      var user = copy.filter(function(person) {
        return person.id == userId;
      });

      var arr =  data.filter(function(person) {
          var distance = calculation.getDistanceBetweenTwoCoordinates(user[0].latitude, user[0].longitude, person.latitude, person.longitude);
          distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
          return distance <= radius;          
      }).sort((a,b) => { return a.distance - b.distance; });

      res.send(arr);
  });

});

//GET Users witin 50 miles (by default) of a location
//accepts params for latitude, longitude and radius.
router.get('/near', function(req, res, next) {
  const radius = ((req.query.radius.length === 0 ? 50 : req.query.radius) * 1.609344);
  var baseLat = req.query.lat;
  var baseLng = req.query.lng;

  if(baseLat.length == 0 || baseLng.length == 0){
    res.render('error');
  }

  request
    .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      var data = JSON.parse(body);

      var arr =  data.filter(function(person) {
          var distance = calculation.getDistanceBetweenTwoCoordinates(baseLat, baseLng, person.latitude, person.longitude);
          distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
          return distance <= radius;          
      }).sort((a,b) => { return a.distance - b.distance; });

      res.send(arr);
  });

});

module.exports = router;
