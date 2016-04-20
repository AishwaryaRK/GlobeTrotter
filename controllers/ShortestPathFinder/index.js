'use strict';

var ShortestPathFinder = require('./ShortestPathFinder');

module.exports = function (router) {
    router.post('/getShortestPath/locations/', ShortestPathFinder.getShortestPath, function (req, res) {
        res.json(req.shortestPath);
    });
};
