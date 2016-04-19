var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var shortestPathFinder = require('../controllers/ShortestPathFinder/ShortestPathFinder.js');
//var logger = require('../logger');
process.env.NODE_ENV = 'test';
chai.config.includeStack = true;

describe('ShortestPathFinder.test', function () {
    describe('convertNodesToLocations', function () {
        it('Should return list of locations corresponding to nodes ', function (done) {
            var locations = [
                {lat: 3, lng: 4},
                {lat: 2, lng: 2},
                {lat: 4, lng: 48},
                {lat: 5, lng: 7},
                {lat: 6, lng: 3}
            ];
            var shortestPathNodes = [2, 3, 1, 0, 4];
            var expectedOutput = [
                {lat: 4, lng: 48},
                {lat: 5, lng: 7},
                {lat: 2, lng: 2},
                {lat: 3, lng: 4},
                {lat: 6, lng: 3}
            ];
            shortestPathFinder.convertNodesToLocations(locations, shortestPathNodes, function (error, actualOutput) {
                console.log("convertNodesToLocations - actual = " + actualOutput + ", expected = " + expectedOutput);
                expect(actualOutput).to.eql(expectedOutput);
                done();
            });
        });
    });
});
