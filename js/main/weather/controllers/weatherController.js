/**
 * @file Handles Weather based activities
 * @author Cameron Kilgore
 */

nocDashboard.controller("weatherController", function($scope, weatherFactory) {
  $scope.pageInit = function() {
    $scope.location_details = {
      city: "Roswell",
      state: "GA",
    };

    //Stub out object
    $scope.weather = {}; //Manipulated through Wunderground calls

    //Get Radar Image
    $scope.weather.radarImage = $scope.getRadarImage("KEY_MISSING", $scope.location_details.city, $scope.location_details.state);

    //Get Current Conditions Data
    $scope.weather.temperature = 72;
    $scope.weather.current_condition = "Overcast";
  };

  $scope.getRadarImage = function(WUAPIKey, City, State) {
    return weatherFactory.getWundergroundAnimatedRadarData(WUAPIKey, City, State, "http://api.wunderground.com/api/", 15, 800, 480);
  };

  $scope.getConditionsInfo = function() {

  };

  $scope.getForecastInfo = function() {

  };

  $scope.updateWeatherInfo = function() {

  };
});
