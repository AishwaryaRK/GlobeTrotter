'use strict';

var GoogleMapUtility = require('../GoogleMapUtility');
var Grapher = require('../Grapher');
var TSPAlgorithm = require('./TSPAlgorithm');
var async = require('async');

var getShortestPath = function getShortestPath(req, res, next) {
    var locations = req.body.locations;
    async.waterfall([function (next) {
        next(null, locations);
        //this is a hack to pass params to first function
    },
        GoogleMapUtility.getPositions,
        Grapher.constructGraph,
        TSPAlgorithm.tspDynamicAlgo,
        Grapher.convertNodesToLocations
    ], function (err, result) {
        req.shortestPath = result;
        next();
    });
};


module.exports = {
    getShortestPath: getShortestPath
};
