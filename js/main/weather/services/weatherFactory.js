/**
 * @file Services for the Weather pages
 * @author Cameron Kilgore
 */

/**
 * Provides Weather Underground and NWS Alerts API Integration, through Wunderground
 * and NWS JSON and XML feeds.
 *
 * @type {Promise}
 */
nocDashboard.factory('weatherFactory', function($http, $q) {
  var service = {};

  /**
   * Makes an HTTP GET request to the NWS Atom feed, and returns an array of all
   * serialized alerts records as a Promise.
   * @todo implement a proxy solution to work around the CORS flag present on the
   * NWS requests
   * @return {[type]} [description]
   */
  service.getNWSWeatherAlerts = function(ZoneCode, MaxNumberOfEntries) {
    if(MaxNumberOfEntries === undefined) {
      MaxNumberOfEntries = 20;
    }

    if(typeof ZoneCode !== "string") {
      return false;
    }

    //Build URL to download feed
    var requestUrl = "http://alerts.weather.gov/cap/wwaatmget.php?x="+ZoneCode+"&y=0";

    //Make the first XMLHTTPRequest call for the Atom feed
    $http.get(requestUrl).then(function(SuccessResponse) {
      var x2js = new X2JS();
      AtomFeed = x2js.xml_str2json(SuccessResponse);
      console.debug("Atom Feed Data", AtomFeed);

      //TODO Foreach through all Item calls to get their CAP records
      //angular.foreach()
    }, function(ErrorResponse) {
      console.debug("Error", ErrorResponse);
    });
  };

  /**
   * Returns all the knowns alerts known to Wunderground based on the
   * City and State as a Promise.
   *
   * @param  {string} WUAPIKey        Weather Underground API Key. Required.
   * @param  {string} City            A Valid US City that can be used for the location. Required.
   * @param  {string} State           A Valid US Postal code for a state or thoroughfare. Required.
   * @return {promise}           [description]
   */
  service.getWUAPIWeatherAlerts = function (WUAPIKey, City, State) {
    //Validation
    if(typeof WUAPIKey !== "string") {
      return false;
    }

    if(typeof City !== "string") {
      return false;
    }

    if(typeof State !== "string") {
      return false;
    }

    var deferred = $q.defer();

    //Build Request URL
    var requestUrl = "http://api.wunderground.com/api/"+WUAPIKey+"/alerts/q/"+State+"/"+City+".json";

    //Make Request and return Promise
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Wunderground API Response", SuccessResponse);
      if(SuccessResponse.success !== false) {
        deferred.resolve(SuccessResponse.data);
      } else {
        console.log("Somthing's gone wrong.");
        var error = {
          'error': true,
          'type': "UNKNOWN_ERROR",
          'message': "Something went wrong and we don't know what."
        };

        //return error;
        deferred.resolve(error);
      }
    }, function(ErrorResponse) {
      console.debug("Error", Error);
    });
  };

  /**
   * Returns an Animated Radar image. Use the getWundergroundRadarData call for
   * a static image.
   *
   * The Call will return a valid Image URL for a GIF, representing data to
   * request from Weather Underground.
   *
   * The example API Call is an image URL: http://api.wunderground.com/api/{{API_KEY}}/animatedradar/q/GA/Roswell.gif?width=800&height=600&timelabel=1&timelabel.y=10&num=15&rainsnow=1&delay=75&noclutter=1&smooth=1&newmaps=1
   * @param  {string} WUAPIKey        Weather Underground API Key. Required.
   * @param  {string} City            A Valid US City that can be used for the location. If requesting internationally, use the OASIS xNAL equivalent locality name (full name). Required.
   * @param  {string} State           A Valid US Postal code for a state or thoroughfare. If requesting interantionally, use the OASIS xNAL equivalent country (full name). Required.
   * @param  {string} RadarFeedURL    Origin Radar Feed URL. Defaults to known base if not defined.
   * @param  {number} Frames          Number of frames to use. Integer only. Defaults to 15.
   * @param  {number} Width           Integer number representing width in pixels. Defaults to 640.
   * @param  {number} Height          Integer number representing height in pixels. Defaults to 480.
   * @param  {boolean} Smooth         Smooth the color display on the image. Defaults to true.
   * @param  {boolean} TimeLabel      Display the time label. Defaults to true.
   * @param  {number} Delay           Render delay between animation frames in milliseconds. Defaults to 75 (what WSI Terminals use). Cannot be set lower than 25, or higher than 100.
   * @param  {boolean} RainSnow       Enables color change between Rain and Snow/Mix. Defaults to true.
   * @param  {boolean} MakeTrans      Removes the background map (with city/state/counties/administrative areas). Defaults to false.
   * @return {string}                 Image URL that represents a radar image GIF from Weather Underground
   */
  service.getWundergroundAnimatedRadarData = function(WUAPIKey, City, State, RadarFeedURL, Frames, Width, Height, Smooth, TimeLabel, Delay, RainSnow, MakeTrans) {
    //Validation
    if(typeof WUAPIKey !== "string") {
      return false;
    }

    if(typeof RadarFeedURL !== "string") {
      RadarFeedURL = "http://api.wunderground.com/api/";
    }

    if(typeof City !== "string") {
      return false;
    }

    if(typeof State !== "string") {
      return false;
    }

    if(typeof Frames !== "number") {
      Frames = 15;
    }

    if(typeof Width !== "number") {
      Width = 640;
    }

    if(typeof Height !== "number") {
      Height = 480;
    }

    if(typeof Smooth !== "boolean") {
      Smooth = true;
    }

    if(typeof TimeLabel !== "boolean") {
      TimeLabel = true;
    }

    if(typeof Delay !== "number") {
      if(Delay < 25 && Delay > 100) {
        Delay = 75;
      } else {
        Delay = 75;
      }
    }

    if(typeof RainSnow !== "boolean") {
      RainSnow = true;
    }

    if(typeof MakeTrans !== "boolean") {
      MakeTrans = true;
    }

    //Build URL
    var baseUrl = RadarFeedURL+WUAPIKey+"/animatedradar/q/"+State+"/"+City+".gif?";

    //Build String w/ Attributes
    var attributesStr = "width="+Width+"&height="+Height+"&timelabel="+(~~TimeLabel)+"&timelabel.y=15&num="+Frames+"&rainsnow"+(~~RainSnow)+"&delay="+Delay+"&noclutter=1&smooth="+(~~Smooth)+"&newmaps="+(~~MakeTrans);

    var requestUrl = baseUrl+attributesStr;
    console.debug("Request URL", requestUrl);

    //Return String
    return requestUrl;
  };

  //TODO Static Radar Image Request Call

  /**
   * Returns a Promise of current Condition data from Weather Underground.
   * @param  {string} WUAPIKey        Weather Underground API Key. Required.
   * @param  {string} City            A Valid US City that can be used for the location. If requesting internationally, use the OASIS xNAL equivalent locality name (full name). Required.
   * @param  {string} State           A Valid US Postal code for a state or thoroughfare. If requesting interantionally, use the OASIS xNAL equivalent country (full name). Required.
   * @return {promise}           [description]
   */
  service.getWundergroundConditionData = function(WUAPIKey, City, State) {
    //Validation
    if(typeof WUAPIKey !== "string") {
      return false;
    }

    if(typeof City !== "string") {
      return false;
    }

    if(typeof State !== "string") {
      return false;
    }

    var deferred = $q.defer();

    //Build Request URL
    var requestUrl = "http://api.wunderground.com/api/"+WUAPIKey+"/conditions/q/"+State+"/"+City+".json";

    //Make Request and return Promise
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Wunderground API Response", SuccessResponse);
      if(SuccessResponse.success !== false) {
        deferred.resolve(SuccessResponse.data);
      } else {
        console.log("Somthing's gone wrong.");
        var error = {
          'error': true,
          'type': "UNKNOWN_ERROR",
          'message': "Something went wrong and we don't know what."
        };

        //return error;
        deferred.resolve(error);
      }
    }, function(ErrorResponse) {
      console.debug("Error", Error);
    });
  };

  /**
   * Returns a Promise of Forecast data from Weather Underground. The forecast covers the next three days by default.
   * @param  {string} WUAPIKey        Weather Underground API Key. Required.
   * @param  {string} City            A Valid US City that can be used for the location. If requesting internationally, use the OASIS xNAL equivalent locality name (full name). Required.
   * @param  {string} State           A Valid US Postal code for a state or thoroughfare. If requesting interantionally, use the OASIS xNAL equivalent country (full name). Required.
   * @param  {boolean} ReturnExtendedForecast  If set to true, the promise will return a 10-day forecast, opposed to the default 3-day. Defaults to false.
   * @return {promise}           [description]
   */
  service.getWundergroundForecastData = function(WUAPIKey, City, State, ReturnExtendedForecast) {
    //Validation
    if(typeof WUAPIKey !== "string") {
      return false;
    }

    if(typeof City !== "string") {
      return false;
    }

    if(typeof State !== "string") {
      return false;
    }

    if(typeof ReturnExtendedForecast !== "boolean") {
      ReturnExtendedForecast = false;
    }

    var deferred = $q.defer();
    var requestUrl = "";

    //Build Request URL
    if(ReturnExtendedForecast) {
      requestUrl = "http://api.wunderground.com/api/"+WUAPIKey+"/forecast10day/q/"+State+"/"+City+".json";
    } else {
      requestUrl = "http://api.wunderground.com/api/"+WUAPIKey+"/forecast/q/"+State+"/"+City+".json";
    }

    //Make Request and return Promise
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Wunderground API Response", SuccessResponse);
      if(SuccessResponse.success !== false) {
        deferred.resolve(SuccessResponse.data);
      } else {
        console.log("Somthing's gone wrong.");
        var error = {
          'error': true,
          'type': "UNKNOWN_ERROR",
          'message': "Something went wrong and we don't know what."
        };

        //return error;
        deferred.resolve(error);
      }
    }, function(ErrorResponse) {
      console.debug("Error", Error);
    });
  };

  return service;
});
