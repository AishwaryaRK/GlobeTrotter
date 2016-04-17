'use strict';

var GoogleMapUtility = require('../GoogleMapUtility');

var getShortestPath = function getShortestPath(req, res, next) {
    var locations = req.body.locations;
    GoogleMapUtility.getPositions(locations, function (positions) {
        console.log(JSON.stringify(positions));
        req.shortestPath = [];
        next();
    });
};

var getDistance = function getDistance(position1, position2) {
var radiusOfEarth = 6371000  // earth's radiuis = 6,371km
};

module.exports = {
    getShortestPath: getShortestPath
};
