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

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13
    });
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });


    //-----------------------------------------------------------------------------

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    //var map = new google.maps.Map(document.getElementById('map'), {
    //    zoom: 14,
    //    center: {lat: 37.77, lng: -122.447}
    //});
    directionsDisplay.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsDisplay);
    document.getElementById('mode').addEventListener('change', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    directionsService.route({
        origin: {lat: 37.77, lng: -122.447},  // Haight.
        destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
