const calculation = require('../../utils/calculation.js');
const test_data = require('../../data/test_data.json');
const chai = require('chai');

describe('TESTING USERCONTROLLER.JS', () => {
    let radius = (50 * 1.609344);

    it('Test if array has been sorted by distance in ascending order', (done) => {
        var arr = test_data.filter(function (person) {
            var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude)
            distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
            return distance <= radius;
        }).sort((a, b) => { return a.distance - b.distance; });
        chai.assert(arr[0].distance <= arr[1].distance && arr[2].distance >= arr[1].distance, 'array of users sorted into ascending order');
        done();
    });

    it('Test if random array object has property distance', (done) => {
        var arr = test_data.filter(function (person) {
            var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude)
            distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
            return distance <= radius;
        }).sort((a, b) => { return a.distance - b.distance; });
        chai.expect(arr[Math.floor(Math.random() * arr.length)]).to.have.own.property('distance');
        done();
    });

    it('Test to see if furthest user is within the radius', (done) => {
        var arr = test_data.filter(function (person) {
            var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude)
            distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
            return distance <= radius;
        }).sort((a, b) => { return a.distance - b.distance; });
        chai.assert(arr[arr.length - 1].distance <= radius);
        done();
    });

    it('Test to confirm count of people living 50miles of london ', (done) => {
        var arr = test_data.filter(function (person) {
            var distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude)
            distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
            return distance <= radius;
        });
        chai.assert(arr.length == 3);
        done();
    });

    it('Test users near a random user are all within 50miles', (done) => {
        var randomUser = test_data[Math.floor(Math.random() * test_data.length)];
        var arr = test_data.filter(function (person) {
            var distance = calculation.getDistanceBetweenTwoCoordinates(randomUser.latitude, randomUser.longitude, person.latitude, person.longitude)
            distance < radius ? person['distance'] = (distance * 0.62137).toFixed(2) : null;
            return distance <= radius;
        });
        chai.assert(arr.filter((person) => { return person.distance <= 50 }).length == arr.length);
        done();
    });

});