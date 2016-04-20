'use strict';

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var tspDynamicAlgo = function tspDynamicAlgo(locations, graph, callback) {
    var shortestPathNodes = [];

    callback(null, locations, shortestPathNodes);
};

module.exports = {
    tspDynamicAlgo: tspDynamicAlgo
};
