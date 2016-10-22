/**
 * @file Services for accessing RSS Feeds defined for News
 * @author Cameron Kilgore
 */

nocDashboard.factory("newsFactory", function($http, $q) {
  var service = {};

  service.getLatestHeadlines = function(NewsFeedURL) {
    //Validation
    if(typeof NewsFeedURL !== 'string') {
      return false;
    }

    var deferred = $q.defer();

    //Get the latest XML Feed
    $http.get(NewsFeedURL).then(function(SuccessResponse) {
      var x2js = new X2JS();
      ProcessedFeed = x2js.xml_str2json(SuccessResponse);

      console.debug("SuccessResponse", SuccessResponse);
      console.debug("ProcessedFeed", ProcessedFeed);

      deferred.resolve(ProcessedFeed);
    }, function(ErrorResponse) {
      console.debug("Error", ErrorResponse);
    });

    return deferred.promise;
  };

  return service;
});
