'use strict';

var GoogleMapUtility = require('../GoogleMapUtility');
var Grapher = require('../Grapher');
var async = require('async');

var getShortestPath = function getShortestPath(req, res, next) {
    var locations = req.body.locations;
    async.waterfall([function (next) {
        next(null, locations);
        //this is a hack to pass params to first function
    },
        GoogleMapUtility.getPositions,
        Grapher.constructGraph,
        tspDynamicAlgo,
        convertNodesToLocations
    ], function (err, result) {
        req.shortestPath = result;
        next();
    });
};

var tspDynamicAlgo = function tspDynamicAlgo(locations, graph, callback) {
    var shortestPathNodes = [];
    callback(null, locations, shortestPathNodes);
};

var convertNodesToLocations = function convertNodesToLocations(locations, shortestPathNodes, callback) {
    callback(null, shortestPath);
};

module.exports = {
    getShortestPath: getShortestPath
};
