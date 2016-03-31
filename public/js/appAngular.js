'use strict';
var app = angular.module('GlobeTrotter', []);
(function () {
    app.controller('FooterController', ['$scope', function ($scope) {
        $scope.copyrightLabel = new Date().getFullYear() + ' HirokiARK';
    }]);
})();
