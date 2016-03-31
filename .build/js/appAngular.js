'use strict';
var app = angular.module('GlobeTrotter', []);
(function () {
    app.controller('FooterController', ['$scope', function ($scope) {
        alert("ok");
        $scope.copyrightLabel = new Date().getFullYear() + ' HirokiARK';
    }]);
})();
