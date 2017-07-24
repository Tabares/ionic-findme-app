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
  '$cordovaKeyboard',
  '$compile',
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
    $http,
    $cordovaKeyboard,
    $compile
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
          zoomControlPosition: 'topright',
          icon: {
            iconUrl: 'img/pin.png',
            iconSize: [38, 44], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [18, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
          }
        },
        markers: {
          /*m1: {
            lat: 25.6729159,
            lng: -100.3098922,
            message: "I'm a static marker with defaultIcon",
            focus: false,
            icon: {
              iconUrl: 'img/pin.png',
              iconSize: [38, 44], // size of the icon
              shadowSize: [50, 64], // size of the shadow
              iconAnchor: [18, 94], // point of the icon which will correspond to marker's location
              shadowAnchor: [4, 62], // the same for the shadow
              popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor


            }
          },*/
        },
        icon: {
          iconUrl: 'img/pin.png',
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
      $scope.accessToken = "039c33463f4548e099b84ff4385c58a4";
      $scope.baseUrl = "https://api.api.ai/v1/";
      //$scope.chat();
      //$scope.chatbox = [{ message: 'hola', entity: 'human'}, { message: 'hola como estas', entity: 'bot'}];
      $scope.textPlaceholder = "What's Happenig?";
      $scope.keyboard = false;
      $scope.chatbox = [];
      $scope.initialChat();
      ///$scope.bright();
    }

    $scope.initialChat = function(){
      var req = {
      method: 'POST',
      url: $scope.baseUrl + "query",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
      "Authorization": "Bearer " + $scope.accessToken
      },
      data: JSON.stringify({query: "Accidente en curso", lang: "es", sessionId: "yaydevdiner"}),
      }

      $http(req).then(
      function(success) {

      $('#x').append('<li class="bot-box" tabindex="1">'+ success.data.result.speech +'</li>');
      $('li').last().addClass('active-li').focus();
      }, function(error) {
      // error
      alert('Bot Error');
      console.log("Location error!");
      console.log(err);
      });
    }

    $scope.initialFoto = function(){
      var req = {
      method: 'POST',
      url: $scope.baseUrl + "query",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: {
      "Authorization": "Bearer " + $scope.accessToken
      },
      data: JSON.stringify({query: "Enviando foto", lang: "es", sessionId: "yaydevdiner"}),
      }

      $http(req).then(
      function(success) {

      $('#x').append('<li class="bot-box" tabindex="1">'+ success.data.result.speech +'</li>');
      $('li').last().addClass('active-li').focus();
      }, function(error) {
      // error
      alert('Bot Error');
      console.log("Location error!");
      console.log(err);
      });
    }

    $scope.chat = function(){
      //var text = $speechInput.val();
      var text = $scope.newLocation.name;
      $scope.newLocation.name = ""
      //$scope.chatbox.push({ message: text, entity: 'human'});
      $scope.textPlaceholder = "...";
      ///var myEl = angular.element( document.querySelector( '#x' ) );

      //myEl.append('<li class="user-box">'+ text +'</li>');

      $('#x').append('<li class="user-box" tabindex="1">'+ text +'</li>');
      $('li').last().addClass('active-li').focus();



      var req = {
        method: 'POST',
        url: $scope.baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + $scope.accessToken
        },
        data: JSON.stringify({query: text, lang: "es", sessionId: "yaydevdiner"}),
      }

      $http(req).then(
        function(success) {
         //$scope.chatbox.push({ message: success.data.result.speech, entity: 'bot'});
         $('#x').append('<li class="bot-box" tabindex="1">'+ success.data.result.speech +'</li>');
         $('li').last().addClass('active-li').focus();

         if( success.data.result.speech == "¿Podrías tomar una foto del percance?"){
          $('.action-container').appendTo('#x');
          $('.action-container').show();
          $('#x').append('<li class="bot-box" tabindex="1">'+ 'Utiliza este botón por favor' +'</li>');
          $('li').last().addClass('active-li').focus();
         }
         text = text.toLowerCase();

         if(text == "mapa" || text == "ok" || text == "seguro" || text == "desde luego" || text == "si"){
          $('#map-box').appendTo('#x');
          $('#map-box').show();
          //$('#x').append('<li class="bot-box" tabindex="1">Your location is '+success.data.result.speech+'</li>');

         }


        }, function(error) {
          // error
          console.log("Location error!");
          console.log(err);
        });






      /*$.ajax({
        type: "POST",
        url: $scope.baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + $scope.accessToken
        },
        data: JSON.stringify({query: text, lang: "en", sessionId: "yaydevdiner"}),

        success: function(data) {
          console.log(data);
          //prepareResponse(data);
        },
        error: function() {
          //respond(messageInternalError);
        }
      });*/
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
            message: "Percance",
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
    $scope.help = false;

    $scope.sendReport = function() {
      $scope.postData();
      LocationsService.savedLocations.push($scope.newLocation);
      $scope.modal.hide();
      $scope.main = false;
      $scope.goTo(LocationsService.savedLocations.length - 1, 18);
    }

    $scope.postData = function() {

      var file = $scope.file3,
        uploadUrl = "http://starkdns.southcentralus.cloudapp.azure.com:8080/safeReporter-1.0/reporter/sendIssue",
        json = '{ "coordinate":  { "latitude": ' + $scope.newLocation.lat + ', "longitude": ' + $scope.newLocation.lng + '}, "description": "' + $scope.newLocation.name + '"}',
        fd = new FormData();

      if(!$scope.newLocation.name){
        $scope.newLocation.name  = "Car Crash";
      }

      console.log(file);

      fd.append('report', json)
      fd.append('imageReport', file);
      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
        .success(function(response) {
          //alert('cpol' + response)
          $scope.help = true;
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

        $('#camera-box').appendTo('#x');
        $('#camera-box').show();
        $('li').last().addClass('active-li').focus();

        var options = {
          quality: 100,
          targetWidth: 1000,
          targetHeight: 1000,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          saveToPhotoAlbum: true,
          correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
          $scope.file3 = imageData; //fail on server
          $scope.initialFoto();
          $scope.sendReport();
          $('#x').append('<li class="user-box" tabindex="1">'+ "Eviando foto" +'</li>');
          $('li').last().addClass('active-li').focus();
        }, function(err) {
          console.log(err);
          // An error occured. Show a message to the user
           $scope.sendReport();
        });

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
        $scope.file3 = fileEntry.fullPath;
        // displayFileData(fileEntry.nativeURL, "Native URL");

      }, function() {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
        $scope.createNewFileEntry(imgUri);
      });
    }

    $scope.createNewFileEntry = function(imgUri) {
      window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", {
          create: true,
          exclusive: false
        }, function(fileEntry) {

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
      $scope.help = false;

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
          $scope.chat();
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
