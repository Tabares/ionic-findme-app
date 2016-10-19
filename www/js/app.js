// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate'])

.run(function($ionicPlatform, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var onShake = function() {
      alert("device is being shaken");
      //$scope.locate();
      $timeout(function() {
        var el = document.getElementById('location');
        angular.element(el).triggerHandler('click');
      }, 0);
    };
    var onError = function() {
      // Fired when there is an accelerometer error (optional)
      alert("Error on device");
    };
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      window.cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    //brigthness
    // Start watching for shake gestures and call "onShake"
    // with a shake sensitivity of 40 (optional, default 30)
    shake.startWatch(onShake, 35 /*, onError */ );
    // Stop watching for shake gestures
    //shake.stopWatch();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MapController'
  })

  .state('app.form', {
    url: "/map",
    abstract: true,
    templateUrl: "templates/addLocation.html",
    controller: 'CameraController'
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html"
      }
    }
  })

  $urlRouterProvider.otherwise('/app/map');

});
