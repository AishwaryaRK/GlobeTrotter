(function () {
    'use strict';
    app.factory('ApiFactory', ['$http',
        function ($http) {
            return {
                getShortestPath: function (locations) {
                    var csrf = document.getElementById('csrfid').value;
                    var data = {
                        '_csrf': csrf,
                        'locations': locations
                    };
                    return $http.post('/ShortestPathFinder/getShortestPath/locations/', data)
                        .then(function (data) {
                            return data.data;
                        }, xhrErrorHandler);
                }
            };
        }
    ]);

    function xhrErrorHandler(data, status, headers, config) {
        console.log('failure message: ' +
            JSON.stringify({
                data: data
            }) +
            JSON.stringify({
                status: status
            }) +
            JSON.stringify({
                headers: headers
            }) +
            JSON.stringify({
                config: config
            }));
    }

})();
