/**
 * @file Services for the Weather pages
 * @author Cameron Kilgore
 */

/**
 * [service description]
 * @type {Object}
 */
nocDashboard.factory('weatherFactory', function($http, $q) {
  var service = {};

  /**
   * Makes an HTTP GET request to the CAP Atom feed, and returns an array of all
   * serialized CAP records referenced in the Atom feed. The execution time on
   * this component is n*n+1.
   * @return {[type]} [description]
   */
  service.getCAPRecords = function(CAPFeedUrl, MaxNumberOfEntries) {
    if(MaxNumberOfEntries === undefined) {
      MaxNumberOfEntries = 20;
    }

    if(CAPFeedUrl === undefined || CAPFeedUrl === null) {
      return false;
    }

    //Make the first XMLHTTPRequest call for the Atom feed
    $http.get(CAPFeedUrl).then(function(SuccessResponse) {
      var x2js = new X2JS();
      AtomFeed = x2js.xml_str2json(SuccessResponse);
      console.debug("Atom Feed Data", AtomFeed);

      //Foreach through all Item calls to get their CAP records
      //angular.foreach()
    }, function(ErrorResponse) {
      console.debug("Error", ErrorResponse);
    });
  };

  return service;
});
