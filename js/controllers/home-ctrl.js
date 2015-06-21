angular.module('TopAlbums').controller('homeCtrl', [ '$scope', 'lastFM-Service', function($scope, lastFM, $mdSidenav){

    // define scope variables
    $scope.username = "";
    $scope.selectedTimeframe = "";

    // LastFM data
    $scope.topAlbums = [];
    $scope.userData = {};

    // timeframe options
    $scope.timeframeOptions = [
        { value: "7day", display: "Last Week"},
        { value: "1month", display: "Last Month"},
        { value: "3month", display: "Last 3 Months"},
        { value: "6month", display: "Last 6 Months"},
        { value: "12month", display: "Last Year"},
        { value: "overall", display: "All-time"}
    ];

    // user submitted form, fetch data
    $scope.submitUserData = function() {

        lastFM.getUsersTopAlbums($scope.username, $scope.timeframe).then(function (response) {
            var albums = response.data.topalbums;

            // can get successful responses even if the user has no tracks played
            if (albums.total === "0") {
                window.alert("The user you requested has never scrobbled to LastFM.");
                return;
            }
            var albums = response.data.topalbums.album;

            // LastFM API returns objects with properties that start with #
            // Angular directives don't seem to know how to access these..
            // TODO: find workaround
            albums.forEach(function (album){
                album.imgUrl = album.image[3]["#text"];
            });
            $scope.topAlbums = albums;
        });

        lastFM.getUserBasicInfo($scope.username).then(function (response) {
            $scope.userData = response.data.user;
        });

    };

    // TODO: implement sidebar
    $scope.showHideSidebar = function () {
        $mdSidenav('left').toggle();
    };
}]);