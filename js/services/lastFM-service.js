angular.module('TopAlbums').service("lastFM-Service", ['$rootScope', '$http', function($rootScope, $http) {
    // enter your own LastFM apiKey here
    var apiKey = "";

    return {
        getUsersTopAlbums: function(username, timeframe) {
            var baseURL = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=10";
            var endURL = "&api_key=" + apiKey + "&format=json";
            return $http({
                method : 'GET',
                url : baseURL + "&user=" + username + "&period=" + timeframe + endURL
            })
            .success(function(response) {
                if (response.error) {
                    window.alert(response.message);
                    return;
                }
                return response.topalbums.album;
            })
            .error(function(data, status) {
                window.alert("Oops something went wrong. I should really handle errors better. Status:" + status);
            });
        },
        getUserBasicInfo: function(username) {
            return $http({
                method : 'GET',
                url : "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" + username + "&api_key=" + apiKey + "&format=json"
            })
            .success(function(response) {
                if (response.error) {
                    window.alert(response.message);
                    return;
                }
                return response;
            })
            .error(function(data, status) {
                window.alert("Oops something went wrong. I should really handle errors better. Status:" + status);
            });
        }
    }
}]);