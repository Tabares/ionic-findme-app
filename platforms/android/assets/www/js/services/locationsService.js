angular.module('starter').factory('LocationsService', [ function() {

  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      name : "Monterrey, Nuevo León",
      lat : 25.6729159,
      lng : -100.3098922,
      icon: {
        iconUrl: 'img/pin.png',
        iconSize: [38, 45], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [18, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor


      }
    },
    {
      name : "Washington D.C., USA",
      lat : 38.8951100,
      lng : -77.0363700
    },
    {
      name : "London, England",
      lat : 51.500152,
      lng : -0.126236
    },
    {
      name : "Paris, France",
      lat : 48.864716,
      lng : 2.349014
    },
    {
      name : "Moscow, Russia",
      lat : 55.752121,
      lng : 37.617664
    },
    {
      name : "Rio de Janeiro, Brazil",
      lat : -22.970722,
      lng : -43.182365
    },
    {
      name : "Sydney, Australia",
      lat : -33.865143,
      lng : 151.209900
    }

  ];

  return locationsObj;

}]);
