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

    $scope.nws_zone_code = "NCC101";

    //Stub out objects
    $scope.weather = {}; //Manipulated through Wunderground calls
    $scope.alerts = {};

    //TODO Get NWS Alerts (build a proxy for the Atom feed)
    //$scope.alerts = $scope.getNWSAlerts("NCZ106");

    //Get Wunderground Alerts
    $scope.alerts = $scope.getWUAlerts("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);

    //Get Radar Image
    $scope.weather.radarImage = $scope.getRadarImage("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);

    //Get Current Conditions Data
    $scope.weather.temperature = 72;
    $scope.weather.current_condition = "Overcast";
  };

  $scope.getRadarImage = function(WUAPIKey, City, State) {
    return weatherFactory.getWundergroundAnimatedRadarData(WUAPIKey, City, State, "http://api.wunderground.com/api/", 15, 800, 480);
  };

  $scope.getNWSAlerts = function(ZoneCode) {
    $scope.alerts = weatherFactory.getNWSWeatherAlerts(ZoneCode);

    console.log("Weather Log Call Made");
  };

  $scope.getWUAlerts = function(WUAPIKey, City, State) {
    $scope.alerts = weatherFactory.getWUAPIWeatherAlerts(WUAPIKey, City, State);

    console.log("Alerts Log Call Made");
  };

  $scope.getConditionsInfo = function() {

  };

  $scope.getForecastInfo = function() {

  };

  /**
   * Delegate method that based on config, passes on request to either
   * the WU or NWS Alert request Factory call.
   */
  $scope.getWeatherAlerts = function() {

  };

  $scope.getAlertsFromWunderground = function() {

  };

  $scope.getAlertsFromNWS = function() {

  };

  $scope.updateWeatherInfo = function() {

  };
});
