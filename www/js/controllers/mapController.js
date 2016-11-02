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
  '$http',
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
    $cordovaDevice,
    $http
  ) {
    /**
     * Once state loaded, get put map on scope.
     */
    $scope.$on("$stateChangeSuccess", function() {

      $scope.locations = LocationsService.savedLocations;
      $scope.newLocation;

      /*if (!InstructionsService.instructions.newLocations.seen) {

        var instructionsPopup = $ionicPopup.alert({
          title: 'Find Me!!!',
          cssClass: 'front-screen',
          template: InstructionsService.instructions.newLocations.text
        });
        instructionsPopup.then(function(res) {
          InstructionsService.instructions.newLocations.seen = true;
        });
        $scope.setBrightness(1);
      }*/

      //var greenIcon = new LeafIcon({iconUrl: 'http://www.clipartbest.com/cliparts/RiA/A5L/RiAA5LkBT.png'});
      var greenIcon = L.icon({
        iconUrl: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png',
        //shadowUrl: 'leaf-shadow.png',
        iconSize: [38, 95], // size of the icon
        //shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });


      $scope.map = {
        defaults: {
          tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          maxZoom: 18,
          zoomControlPosition: 'topright'
        },
        markers: {
          m1: {
            lat: 25.6729159,
            lng: -100.3098922,
            message: "I'm a static marker with defaultIcon",
            focus: false,
            icon: {
              iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
              iconSize: [38, 45], // size of the icon
              shadowSize: [50, 64], // size of the shadow
              iconAnchor: [18, 94], // point of the icon which will correspond to marker's location
              shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor


            }
          },
        },
        defaultIcon: {
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
          shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor

        },
        leafIcon: {
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
          shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
          iconSize: [38, 95], // size of the icon
          shadowSize: [50, 64], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        events: {
          map: {
            enable: ['context'],
            logic: 'emit'
          }
        }
      };



      $scope.goTo(0, 12);

    });

    $scope.shake2 = function() {};

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
      $scope.setBrightness(1000);
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
      LocationsService.savedLocations.push($scope.newLocation);
      //$scope.modal.hide();
      $scope.goTo(LocationsService.savedLocations.length - 1, 18);
    };

    $scope.hideApp = function() {
      var instructionsPopup = $ionicPopup.alert({
        title: 'Find Me!!!',
        cssClass: 'front-screen',
        template: InstructionsService.instructions.newLocations.text
      });
      instructionsPopup.then(function(res) {
        InstructionsService.instructions.newLocations.seen = true;
      });
      $scope.setBrightness(1);
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

      $scope.map.icon = {
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
        shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1000px-Map_pin_icon.svg.png',
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      }

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
            message: "Incident Location",
            focus: true,
            draggable: false
          };

        }, function(err) {
          // error
          console.log("Location error!");
          console.log(err);
        });

    };


    //CameraController
    $scope.photo = true;
    $scope.valid = true;
    $scope.main = true;


    $scope.sendReport = function() {
      $scope.postData();
      LocationsService.savedLocations.push($scope.newLocation);
      $scope.modal.hide();
      $scope.main = false;
      $scope.goTo(LocationsService.savedLocations.length - 1, 18);
    }

    $scope.postData = function() {
      //this.uploadFileToUrl = function(file, uploadUrl){*/
      alert($scope.imgURI);
      alert($scope.file2);
      alert($scope.file1);
      alert('file three');

      alert($scope.file3);

      //var file = $scope.getFileEntry($scope.imgURI);

      /*if(!$scope.imgURI){
        $scope.imgURI = null;
      }*/
      var file = $scope.file3;
      var uploadUrl = "http://starkdemo.southcentralus.cloudapp.azure.com:8080/safeReporter-1.0/reporter/sendIssue";
      var json = '{ "coordinate":  { "latitude": ' + $scope.newLocation.lat + ', "longitude": ' + $scope.newLocation.lng + '}, "description": "' + $scope.newLocation.name + '"}';
      var fd = new FormData();
      fd.append('report', json)
      fd.append('imageReport', file);
      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .success(function(response) {
          alert('cpol' + response)
        })
        .error(function(error) {
          alert('error ' + error)
        });

    }


    $scope.removePhoto = function() {

        $scope.photo = true;
        $scope.imgURI = "";
      }
      //Test link //$scope.imgURI = "file:///C:/Users/jose.tabares.sotelo/Pictures/ext.jpg";
    $scope.takePhoto = function() {
        $scope.photo = false;

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

          ///prueba 2
          //FilePath will resolve the path
        /*  window.FilePath.resolveNativePath(imageData, function(result) {
            imageURI = 'file://' + result;
            console.log(imageURI);
            alert('modified uri ' + imageURI);
            $scope.file3 = imageURI;
            resolve(imageURI);
          });*/
          ////$scope.imgURI = "data:image/jpeg;base64," + imageData;
          //$scope.file3 = "data:image/jpeg;base64," + imageData;
          //alert('getfilexxxx');

          $scope.file3 = imageData;//fail on server
          //$scope.getFileEntry(imageData);

          /////////////////////////////////////////////////////////////////
          ///test get file3


          // 4
          onImageSuccess(imageData);

          function onImageSuccess(fileURI) {
            createFileEntry(fileURI);
          }

          function createFileEntry(fileURI) {
            window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
          }

          // 5
          function copyFile(fileEntry) {
            alert(fileEntry);

            var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
            alert(name);
            var newName = makeid() + name;

            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                fileEntry.copyTo(
                  fileSystem2,
                  newName,
                  onCopySuccess,
                  fail
                );
              },
              fail);
          }

          // 6
          function onCopySuccess(entry) {
            $scope.$apply(function() {
              $scope.images.push(entry.nativeURL);
            });
          }

          function fail(error) {
            console.log("fail: " + error.code);
          }

          function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
          }

          ///test with function








          ////////////////////////////////////////////////////////

        }, function(err) {
          console.log(err);
          $scope.imgURI = "file:///C:/Users/jose.tabares.sotelo/Pictures/ext.jpg";

          // An error occured. Show a message to the user
        });
        //alert($scope.imgURI);
      }
      //Brightness
    $scope.setBrightness = function(newBrightness) {
      console.log(newBrightness);
      myBrightness = parseFloat(newBrightness) / 1000;
      console.log(myBrightness)
      if (window.cordova && window.cordova.plugins.brightness) {
        var LightControl = cordova.plugins.brightness;
        try {
          LightControl.setBrightness(myBrightness, setsuccess, seterror);
        } catch (err) {
          console.log("setBrightness", err);
        }

        function seterror(e) {
          console.log("seterror", e);
        }

        function setsuccess(e) {
          console.log("setsuccess", e);
          var brightness = Math.round(e * 1000);
          $scope.brightness = brightness;
        }
        LightControl.setKeepScreenOn(true);

      }
    }

    ///Brightness

     $scope.getFileEntry = function(imgUri) {
      window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        alert('getfile');
        alert("got file: " + fileEntry.fullPath);
        $scope.file3 = fileEntry.fullPath;
        // displayFileData(fileEntry.nativeURL, "Native URL");

      }, function() {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
        $scope.createNewFileEntry(imgUri);
      });
    }

    $scope.createNewFileEntry = function   (imgUri) {
      window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", {
          create: true,
          exclusive: false
        }, function(fileEntry) {

          // Do something with it, like write to it, upload it, etc.
          // writeFile(fileEntry, imgUri);
          alert('ddd')
          alert("got file: " + fileEntry.fullPath);
          // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

      }, onErrorResolveUrl);
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
      $scope.setBrightness(1);
      $scope.main = true;
    }


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
