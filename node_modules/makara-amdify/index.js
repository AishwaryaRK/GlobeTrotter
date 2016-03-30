"use strict";

var mlpp = require('makara-languagepackpath');
var writer = require('makara-writer-amd');
module.exports = {
    build: function (root, cb) {
        require('makara-builder')(root, writer, cb);
    },
    languagePackPath: function (locale) {
        // Require.js insists on adding .js to everything,
        // even though there's no reason javascript URLs have to have .js in them.
        return mlpp.languagePackPath(locale, true);
    },
    middleware: function () {
        return mlpp.middleware({nosuffix: true});
    }
};
