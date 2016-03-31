'use strict';
var app = angular.module('GlobeTrotter', ['ngSanitize']);
(function () {
    app.controller('FooterController', ['$scope', function ($scope) {
        alert("ok");
        $scope.copyrightLabel = new Date().getFullYear() + ' HirokiARK';
    }]);
})();
