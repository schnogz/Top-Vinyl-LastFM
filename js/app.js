var app = angular.module('TopAlbums', ['ngRoute', 'ngMaterial']);

app.config(["$routeProvider", "$mdThemingProvider", "$mdIconProvider", function ($routeProvider, $mdThemingProvider, $mdIconProvider) {
    // route configurations
    $routeProvider.when("/", {
        templateUrl: "js/templates/home.html",
        controller: "homeCtrl"
    }).when("/stream", {
        templateUrl: "js/templates/app-stream.html",
        controller: "mainCtrl"
    }).otherwise({
        redirectTo: "/"
    });

    // icon configurations
    $mdIconProvider
        .icon("menu", "images/menu.svg", 24)
        .icon("twitter-retweet", "images/twitter-buttons/retweet.svg", 24)
        .icon("twitter-details", "images/twitter-buttons/details.svg", 24)
        .icon("twitter-favorite", "images/twitter-buttons/favorite.svg", 24)
        .icon("twitter-reply", "images/twitter-buttons/reply.svg", 24);

    // theme configuration
    $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('red')
}]);