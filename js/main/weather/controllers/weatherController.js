/**
 * @file Handles Weather based activities
 * @author Cameron Kilgore
 */

nocDashboard.controller("weatherController", function($scope, weatherFactory, settings) {
  $scope.weather = {};
  $scope.weather.settings = settings;
  $scope.weather.location_details = {
    city: $scope.weather.settings.wunderground_city,
    state: $scope.weather.settings.wunderground_state,
  };
  $scope.weather.nws_zone_code = $scope.weather.settings.cap_atom_feed_zonecode;
  $scope.weather.WUAPIKey = $scope.weather.settings.wunderground_api_key;
  $scope.weather.radarImage = "";
  $scope.weather.alerts = {};
  $scope.weather.conditions = {};
  $scope.weather.forecast = {};

  $scope.weather.update_time = moment().format("MMM D YYYY h:mm:ss a");

  $scope.pageInit = function() {
    $scope.loadWeatherData();
  };

  $scope.loadWeatherData = function() {
    //TODO Get NWS Alerts (build a proxy for the Atom feed)
    //$scope.alerts = $scope.getNWSAlerts("NCZ106");

    //Get Wunderground Alerts
    $scope.getWUAlerts($scope.weather.WUAPIKey, $scope.weather.location_details.city, $scope.weather.location_details.state);

    //Get Radar Image
    $scope.weather.radarImage = $scope.getRadarImage($scope.weather.WUAPIKey, $scope.weather.location_details.city, $scope.weather.location_details.state);

    //Get Current Conditions Data
    $scope.getConditionsInfo($scope.weather.WUAPIKey, $scope.weather.location_details.city, $scope.weather.location_details.state);

    //Get Forecast Data
    $scope.getForecastInfo($scope.weather.WUAPIKey, $scope.weather.location_details.city, $scope.weather.location_details.state);
  };

  $scope.getRadarImage = function(WUAPIKey, City, State) {
    return weatherFactory.getWundergroundAnimatedRadarData(WUAPIKey, City, State, "http://api.wunderground.com/api/", 15, 1000, 480);
  };

  $scope.getNWSAlerts = function(ZoneCode) {
    $scope.weather.alerts = weatherFactory.getNWSWeatherAlerts(ZoneCode);
  };

  $scope.getWUAlerts = function(WUAPIKey, City, State) {
    weatherFactory.getWUAPIWeatherAlerts(WUAPIKey, City, State).then(function(Response) {
      console.debug("Alerts Results", Response);
      $scope.weather.alerts = Response;
    });
  };

  $scope.getConditionsInfo = function(WUAPIKey, City, State) {
    weatherFactory.getWundergroundConditionData(WUAPIKey, City, State).then(function(Response) {
      console.debug("Results", Response);

      //Determine if after sunset or not
      var currentTime = new Date();
      var lat = parseFloat(Response.display_location.latitude);
      var long = parseFloat(Response.display_location.longitude);
      var SunsetObject = SunCalc.getTimes(new Date(), lat, long);

      if (currentTime >= SunsetObject.sunset) {
        $scope.weather.conditions.isSunset = true;
      } else {
        $scope.weather.conditions.isSunset = false;
      }

      $scope.weather.conditions = Response;
    });
  };

  $scope.getForecastInfo = function(WUAPIKey, City, State) {
    weatherFactory.getWundergroundForecastData(WUAPIKey, City, State).then(function(Response) {
      console.debug("Results", Response);
      $scope.weather.forecast = Response;
    });
  };
});

nocDashboard.filter("inMMHg", function() {
  return function(pressureMb) {
    var pressureMMHg = pressureMb * 0.75006375541921;
    pressureMMHg = parseFloat(pressureMMHg).toFixed(2);
    return pressureMMHg;
  };
});
