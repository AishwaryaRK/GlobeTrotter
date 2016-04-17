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
    console.log("path -> " + options.path);
    https.get(options, function (response) {
        var body = "";
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            var position = JSON.parse(body).results[0].geometry.location;
            console.log("data returned by API:- ");
            console.log(position);
            callback(position);
        });
    });
};

var getPositions = function getPositions(locations, onDone) {
    var positions = [];
    async.each(locations, function (location, callback) {
        getPosition(location, function (position) {
            positions.push(position);
            callback();
        });
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            onDone(positions);
        }
    });
};

module.exports = {
    getPosition: getPosition,
    getPositions: getPositions
};
