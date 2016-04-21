'use strict';

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var tspDynamicAlgo = function tspDynamicAlgo(locations, positions, graph, callback) {
    var shortestPathNodes = [];

    callback(null, locations, positions, shortestPathNodes);
};

module.exports = {
    tspDynamicAlgo: tspDynamicAlgo
};
