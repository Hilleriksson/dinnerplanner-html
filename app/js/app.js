

var spotiQuizApp = angular.module('spotiQuiz', ['ngRoute','ngResource','firebase','spotify', 'ngAnimate', 'ui.bootstrap', 'ngAudio', 'chart.js']);


//Necessary for us to connect with our firebaseserver
var config = {
        apiKey: "AIzaSyAAg2sU3kOcKoFiUIjUtEDuHHDdBzxRs6g",
        authDomain: "iprog-project.firebaseapp.com",
        databaseURL: "https://iprog-project.firebaseio.com",
        storageBucket: "iprog-project.appspot.com",
        messagingSenderId: "97572176204"
      };
      firebase.initializeApp(config);

spotiQuizApp.config(function (SpotifyProvider) {
  SpotifyProvider.setClientId('fc5eab90280f4bdc9c380081376babe8');
  SpotifyProvider.setRedirectUri('http://localhost:8000/callback');
  SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
  // If you already have an auth token
  SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
});

spotiQuizApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'LoginController'
      }).
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      }).
      when('/user/:userId', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileController'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactController'
      }).
      when('/category', {
        templateUrl: 'partials/category.html',
        controller: 'CategoryController'
      }).
      when('/play', {
        templateUrl: 'partials/play.html',
        controller: 'PlayController'
      }).
      when('/endPlay', {
        templateUrl: 'partials/endPlay.html',
        controller: 'EndPlayController'
      }).
      when('/createQuiz', {
        templateUrl: 'partials/createQuiz.html',
        controller: 'CreateQuizController'
      }).
      when('/scores', {
        templateUrl: 'partials/scores.html',
        controller: 'ScoresController'
      }).
      when('/description/:quizId', {
        templateUrl: 'partials/description.html',
        controller: 'DescriptionController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);
