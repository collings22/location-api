const calculation = require('../../utils/calculation.js');
const test_data = require('../../data/test_data.json');
const chai = require('chai');

describe('TESTING CALCULATION.JS', () => {

    it('Find difference between a person from London', (done) => {
        let person = test_data[100];
        let distance = calculation.getDistanceBetweenTwoCoordinates(51.509865, -0.118092, person.latitude, person.longitude)
        chai.assert(distance == 3495.2813554016334, 'distance in kilometres is correct');
        distance = (distance * 0.62137).toFixed(2);
        chai.assert(distance == 2171.86, 'distance converted from kilometres to miles is correctly');
        done();
    });
  
  });