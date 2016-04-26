var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var tspAlgorithm = require('../controllers/ShortestPathFinder/TSPAlgorithm.js');
//var logger = require('../logger');
process.env.NODE_ENV = 'test';
chai.config.includeStack = true;

describe('TSPAlgorithm.test', function () {
    describe('tspDynamicAlgo', function () {
        //it('Should return same node if there is only one node', function(done) {});
        //it('Should return pair if there are only two nodes', function(done) {});
        //it('Should return in order if all three nodes are in a line', function(done) {});
        //it('Should return in travel order if three nodes are in a line, but given out of order', function(done){});
        it('Should return shortest path for any arbitrary number of nodes ', function (done) {
            var locations = [];
            var positions = [];
            var graph = [[0, 7, 5, 10], [7, 0, 6, 4], [5, 6, 0, 8], [10, 4, 8, 0]];
            var expectedOutput = [0, 2, 3, 1, 0];
            tspAlgorithm.tspDynamicAlgo(locations, positions, graph, function (error, locations, positions, shortestPathNodes) {
                console.log("tspDynamicAlgo - actual = " + shortestPathNodes + ", expected = " + expectedOutput);
                expect(shortestPathNodes).to.eql(expectedOutput);
                done();
            });
        });
    });
});
