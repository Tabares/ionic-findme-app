angular.module('starter').factory('InstructionsService', [ function() {

  var instructionsObj = {};

  instructionsObj.instructions = {
    newLocations : {
      text : 'Please click the Find Me!!! button to get your location',
      seen : false
    }
  };

  return instructionsObj;

}]);
