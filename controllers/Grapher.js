'use strict';

var constants = require('../config/constants.json');
var async = require('async');

/**
 Built for the pattern of an async.parallel.
 Callback first param is for errors.
 */
var getDistance = function getDistance(position1, position2, callback) {
    if (position1 === position2) {
        callback(null, 0);
    } else {
        // earth's radiuis = 6,371km
        var radiusOfEarth = constants.radiusOfEarth;
        // a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
        // b = 2 ⋅ atan2( √a, √(1−a) )
        // d = R ⋅ b
        var a = Math.sin(Math.abs(position1.lat - position2.lat) / 2) * Math.sin(Math.abs(position1.lat - position2.lat) / 2) + Math.cos(position1.lat) * Math.cos(position2.lat) * Math.sin(Math.abs(position1.lng - position2.lng) / 2) * Math.sin(Math.abs(position1.lng - position2.lng) / 2);
        var b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = radiusOfEarth * b;
        callback(null, distance);
    }
};

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var constructGraph = function constructGraph(locations, positions, callback) {
    var graph = [];
    var functions = [];
    for (var i = 0; i < positions.length; i++) {
        for (var j = 0; j < positions.length; j++) {
            functions.push(getDistance.bind(null, positions[i], positions[j]));
        }
    }
    async.parallel(functions, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        var k = 0;
        for (var i = 0; i < positions.length; i++) {
            graph[i] = [];
            for (var j = 0; j < positions.length; j++) {
                graph[i].push(results[k++]);
            }
        }
        callback(null, locations, positions, graph);
    });
};

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var convertNodesToLocations = function convertNodesToLocations(locations, positions, shortestPathNodes, callback) {
    var shortestPath = [];
    for (var i = 0; i < shortestPathNodes.length; i++) {
        shortestPath.push(positions[shortestPathNodes[i]]);
    }
    callback(null, shortestPath);
};

module.exports = {
    constructGraph: constructGraph,
    convertNodesToLocations: convertNodesToLocations
};
