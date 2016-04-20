'use strict';
var app = angular.module('GlobeTrotter', []);
(function () {

    app.controller('InputLocationController', ['$scope', 'ApiFactory', function ($scope, ApiFactory) {
        $scope.locations = [];
        $scope.location;
        $scope.addLocation = function () {
            $scope.location = angular.element($('#pac-input')).val();
            $scope.locations.push($scope.location);
            $scope.location = null;
        };
        $scope.getShortestPath = function () {
            ApiFactory.getShortestPath($scope.locations).then(function (data) {
                alert(JSON.stringify(data));
            });
        };
    }]);

    app.controller('FooterController', ['$scope', function ($scope) {
        $scope.copyrightLabel = new Date().getFullYear() + ' HirokiARK';
    }]);

    //app.directive('myEnter', function () {
    //    return function (scope, element, attrs) {
    //        element.bind("keydown keypress", function (event) {
    //            if (event.which === 13) {
    //                scope.$apply(function () {
    //                    scope.$eval(attrs.myEnter);
    //                });
    //
    //                event.preventDefault();
    //            }
    //        });
    //    };
    //});

})();
