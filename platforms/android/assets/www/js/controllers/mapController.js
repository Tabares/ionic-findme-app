angular.module('starter').controller('MapController', ['$scope',
  '$cordovaGeolocation',
  '$stateParams',
  '$ionicModal',
  '$ionicPopup',
  'LocationsService',
  'InstructionsService',
  '$cordovaCamera',
  '$cordovaCapture',
  '$timeout',
  '$cordovaDevice',
  function(
    $scope,
    $cordovaGeolocation,
    $stateParams,
    $ionicModal,
    $ionicPopup,
    LocationsService,
    InstructionsService,
    $cordovaCamera,
    $cordovaCapture,
    $timeout,
    $cordovaDevice
  ) {
    /**
     * Once state loaded, get put map on scope.
     */
    $scope.$on("$stateChangeSuccess", function() {

      $scope.locations = LocationsService.savedLocations;
      $scope.newLocation;

      if (!InstructionsService.instructions.newLocations.seen) {

        var instructionsPopup = $ionicPopup.alert({
          title: 'Find Me!!!',
          cssClass: 'front-screen',
          template: InstructionsService.instructions.newLocations.text
        });
        instructionsPopup.then(function(res) {
          InstructionsService.instructions.newLocations.seen = true;
        });

      }

      $scope.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'topright'
        },
        markers: {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };

      $scope.goTo(0, 12);

    });

    $scope.shake2 = function() {
      alert('dfdfsf')
    };





    //CameraController
    $scope.takePhoto = function() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true,
        correctOrientation: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // An error occured. Show a message to the user
      });
    }

    $scope.choosePhoto = function() {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
        $scope.imgURI = imageURI;
      }, function(err) {
        // error
      });

    }

    $scope.captureAudio = function() {
      var options = {
        limit: 3,
        duration: 10
      };

      $cordovaCapture.captureAudio(options).then(function(audioData) {
        // Success! Audio data is here
        alert(JSON.stringify(audioData))
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }

    $scope.captureImage = function() {
      var options = {
        limit: 3
      };

      $cordovaCapture.captureImage(options).then(function(imageData) {
        // Success! Image data is here
        alert(JSON.stringify(imageData))
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }

    $scope.captureVideo = function() {
      var options = {
        limit: 3,
        duration: 15
      };

      $cordovaCapture.captureVideo(options).then(function(videoData) {
        // Success! Video data is here
        alert(JSON.stringify(videoData))
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    }

    //CameraController

    $scope.cancel = function() {
      var instructionsPopup = $ionicPopup.alert({
        title: 'Find Me!!!',
        cssClass: 'front-screen',
        template: InstructionsService.instructions.newLocations.text
      });
      $scope.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'topright'
        },
        markers: {},
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };
      $scope.newLocation.name = '';
      $scope.goTo(0, 12);
    }

    var Location = function() {
      if (!(this instanceof Location)) return new Location();
      this.lat = "";
      this.lng = "";
      this.name = "";
    };

    $ionicModal.fromTemplateUrl('templates/addLocation.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    /**
     * Detect user long-pressing on map to add new location
     */
    $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent) {
      $scope.newLocation = new Location();
      $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
      $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
      $scope.modal.show();
    });

    $scope.loadForm = function() {
      $cordovaGeolocation
        .getCurrentPosition()
        .then(function(position) {
          $scope.locate();
          $scope.newLocation = new Location();
          $scope.newLocation.lat = position.coords.latitude;
          $scope.newLocation.lng = position.coords.longitude;
        }, function(err) {
          // error
          console.log("Location error!");
          console.log(err);
        });
      $scope.modal.show();
      ///$scope.bright();
    }

    $scope.saveLocation = function() {
      alert('You alert detail has been sent, please wait!!!');
      LocationsService.savedLocations.push($scope.newLocation);
      //$scope.modal.hide();
      $scope.goTo(LocationsService.savedLocations.length - 1, 18);
    };

    /**
     * Center map on specific saved location
     * @param locationKey
     */
    $scope.goTo = function(locationKey, focus) {

      var location = LocationsService.savedLocations[locationKey];

      $scope.map.center = {
        lat: location.lat,
        lng: location.lng,
        zoom: focus
      };

      $scope.map.markers[locationKey] = {
        lat: location.lat,
        lng: location.lng,
        message: location.name,
        focus: true,
        draggable: false
      };

    };

    /**
     * Center map on user's current position
     */
    $scope.locate = function() {

      $cordovaGeolocation
        .getCurrentPosition()
        .then(function(position) {
          $scope.map.center.lat = position.coords.latitude;
          $scope.map.center.lng = position.coords.longitude;
          $scope.map.center.zoom = 18;

          $scope.map.markers.now = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            message: "You Are Here",
            focus: true,
            draggable: false
          };

        }, function(err) {
          // error
          console.log("Location error!");
          console.log(err);
        });
        alert('You alert detail has been sent!!!');

    };

    //speech
    $scope.data = {
      speechText: ''
    };
    $scope.recognizedText = '';

    $scope.speakText = function() {
      TTS.speak({
        text: $scope.data.speechText,
        locale: 'en-GB',
        rate: 1.5
      }, function() {
        // Do Something after success
      }, function(reason) {
        // Handle the error case
      });
    };

    $scope.record = function() {
      var recognition = new SpeechRecognition();
      recognition.onresult = function(event) {
        if (event.results.length > 0) {
          $scope.newLocation.name = event.results[0][0].transcript;
          $scope.$apply();
        }
      };
      recognition.start();
    };

    ///brightness
    /*$scope.bright = function() {
      $timeout(function() {
        //var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        //var model = $cordovaDevice.getModel();
        //var platform = $cordovaDevice.getPlatform();
        //var uuid = $cordovaDevice.getUUID();
        //var version = $cordovaDevice.getVersion();

        $scope.onlineOrNot.text = version;
        //if (cordova) {

          var LightControl = cordova.plugins.brightness;

          LightControl.setBrightness(1, function(brightness) {
            alert("The current brightness is: " + brightness);
          }, function(error) {
            alert("Error: " + error);
          });
          brightness.setKeepScreenOn(true);
        //}

      }, 0);
    };*/



  }
]);
