var request = require('request');
var calculation = require('../utils/calculation.js');

exports.GetUserById = (req, res) => {
    var userId = req.params.id;

    if (userId.match(/[a-zA-Z!@#\$%\^\&*\)\(+=._-]/)) {
        res.status(err.status || 500);
        res.render('error');
    }

    request
        .get('https://bpdts-test-app.herokuapp.com/user/' + userId, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            var data = JSON.parse(body);

            var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, data.latitude, data.longitude);
            data['distance'] = (distance * 0.62137).toFixed(2);

            res.send(data);
        });

}

exports.GetUsersInLondonRadius = (req, res) => {
    const radius = (50 * 1.609344);

    request
        .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
            if (error) {
                res.statusCode(500)
                return console.dir(error);
            }
            var data = JSON.parse(body);

            var arr = data.filter(function (person) {
                var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude);
                distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
                return distance <= radius;
            }).sort((a, b) => { return a.distance - b.distance; });

            res.send(arr);
        });

}

exports.GetUsersInRadiusOfUserId = (req, res) => {
    const radius = (50 * 1.609344);
    var userId = req.params.id;

    if (userId.match(/[a-zA-Z!@#\$%\^\&*\)\(+=._-]/) || userId == '0') {
        res.status(err.status || 500);
        res.render('error');
    }

    request
        .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
            if (error) {
                res.status(err.status || 500);
                res.render('error');
            }

            var data = JSON.parse(body);
            var copy = Object.assign([], data);
            var user = copy.filter(function (person) {
                return person.id == userId;
            });

            var arr = data.filter(function (person) {
                var distance = calculation.getDistanceBetweenTwoCoordinates(user[0].latitude, user[0].longitude, person.latitude, person.longitude);
                distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
                return distance <= radius;
            }).sort((a, b) => { return a.distance - b.distance; });

            res.send(arr);
        });

}

exports.GetUsersInRadiusOfLocation = (req, res) => {
    const radius = ((req.query.radius.length === 0 ? 50 : req.query.radius) * 1.609344);
    var [baseLat, baseLng] = [req.query.lat, req.query.lng];

    if (baseLat.length == 0 || baseLng.length == 0) {
        res.status(err.status || 500);
        res.render('error');
    }

    request
        .get('https://bpdts-test-app.herokuapp.com/users', (error, response, body) => {
            if (error) {
                res.status(err.status || 500);
                res.render('error');
            }

            var data = JSON.parse(body);

            var arr = data.filter(function (person) {
                var distance = calculation.getDistanceBetweenTwoCoordinates(baseLat, baseLng, person.latitude, person.longitude);
                distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
                return distance <= radius;
            }).sort((a, b) => { return a.distance - b.distance; });

            res.send(arr);
        });

}