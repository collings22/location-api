var express = require('express');
var router = express.Router();
var request = require('request');

//https://www.latlong.net/place/london-the-uk-14153.html London coords.
//https://www.movable-type.co.uk/scripts/latlong.html Calculating distance between lat/long coords (Haversine formula).
        
function GetDistanceBetweenTwoCoordinates(lat1,lon1,lat2,lon2) {
  var radius = 6371;

  var dLat = ConvertToRadian(lat2-lat1); 
  var dLon = ConvertToRadian(lon2-lon1); 

  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(ConvertToRadian(lat1)) * Math.cos(ConvertToRadian(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = radius * c;
  return d;
}

function ConvertToRadian(degrees) {
  return degrees * (Math.PI/180)
}

router.get('/', function(req, res, next) {
  var radius = (req.query.radius * 1.609344);

  request
    .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
      if(error) {
        return console.dir(error);
      }
      var data = JSON.parse(body);

      var arr =  data.filter(function(person) {
        var distance = GetDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude);
        distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
        return distance <= radius;
      }).sort((a,b) => { return a.distance - b.distance; });

      res.send(arr);
  });

});


module.exports = router;
