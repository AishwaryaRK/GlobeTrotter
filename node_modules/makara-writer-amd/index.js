'use strict';

var mkdirp = require('mkdirp');
var spundle = require('spundle');
var iferr = require('iferr');
var path = require('path');
var fs = require('fs');


module.exports = function writeLocale(appRoot) {
    return function (locale, cb) {
        var m = /(.*)-(.*)/.exec(locale); // Use a real BCP47 parser.
        var outputRoot = path.resolve(appRoot, path.join('.build', locale));
        var localeRoot = path.resolve(appRoot, 'locales');
        mkdirp(outputRoot, iferr(cb, function () {
            amdBuilder(localeRoot, m, iferr(cb, function (out) {
                fs.writeFile(path.resolve(outputRoot, '_languagepack.js'), out, cb);
            }));
        }));
    }
};
var amdBuilder = module.exports.amdBuilder = function (localeRoot, m, cb) {
    spundle(localeRoot, m[2], m[1], iferr(cb, function (out) {
        cb(null, 'define("_languagepack", function () { return ' + JSON.stringify(out) + '; });');
    }));
};