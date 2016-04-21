'use strict';

var https = require('https');
var async = require('async');

var googleMapConfig = require('../config/googleMapConfig.json');

var getPosition = function getPosition(location, callback) {
    location = location.split(" ").join("+");
    //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    var options = {
        hostname: "maps.googleapis.com",
        path: "/maps/api/geocode/json?address=" + location + "&key=" + googleMapConfig.YOUR_API_KEY,
        headers: {
            'Content-Type': 'application/json',
            accept: '*/*'
        },
        port: 443,
        method: 'GET'
    };
    https.get(options, function (response) {
        var body = "";
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var position = JSON.parse(body).results[0].geometry.location;
            callback(position);
        });
    });
};

/**
 Built for the pattern of an async.waterfall.
 Callback first param is for errors.
 */
var getPositions = function getPositions(locations, callback) {
    var positions = [];
    console.log("in getPos");
    console.log(locations);
    async.each(locations, function (location, onDone) {
        getPosition(location, function (position) {
            positions.push(position);
            onDone();
        });
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            callback(null, locations, positions);
        }
    });
};

module.exports = {
    getPosition: getPosition,
    getPositions: getPositions
};
