'use strict';

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var shortestPathNodes = [];

var tspDynamicAlgo = function tspDynamicAlgo(locations, positions, graph, callback) {
    var start = 0;
    var sample = [];
    for (var i = 1; i < graph.length; i++) {
        sample.push(i);
    }
    var traversal = [0];
    var data = getShortestPath(graph, start, sample, traversal);
    data.traversal.push(0);
    shortestPathNodes = data.traversal;
    callback(null, locations, positions, shortestPathNodes);
};

var getShortestPath = function getShortestPath(graph, start, sample) {
    if (sample.length === 1) {
        var traversal = [0];
        traversal.push(sample[0]);
        var distance = graph[start][sample[0]] + graph[sample[0]][0];
        var data = {
            traversal: traversal,
            distance: distance
        };
        return data;
    }
    var combinationCosts = [];
    var traversals = [];
    var n = sample.length;
    for (var k = 0; k < n; k++) {
        var s = [];
        for (var i = 0; i < n; i++) {
            if (i != k) {
                s.push(sample[i]);
            }
        }
        var data = getShortestPath(graph, sample[k], s);
        data.traversal.push(sample[k]);
        traversals.push(data.traversal);
        combinationCosts.push(graph[start][sample[k]] + data.distance);
    }
    var min = getMin(combinationCosts);
    var minTraversal = traversals[combinationCosts.indexOf(min)];
    return {
        traversal: minTraversal,
        distance: min
    };
};

var getMin = function getMin(costs) {
    return Math.min.apply(Math, costs);
}

module.exports = {
    tspDynamicAlgo: tspDynamicAlgo
};
