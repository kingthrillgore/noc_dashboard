/**
 * @file Services for accessing RSS Feeds defined for News
 * @author Cameron Kilgore
 */

nocDashboard.factory("newsFactory", function($http, $q) {
  var service = {};

  service.getLatestHeadlines = function(NewsFeedURL, EnablePassthrough) {
    //Validation
    if(typeof NewsFeedURL !== 'string') {
      return false;
    }

    if(typeof EnablePassthrough !== 'boolean') {
      EnablePassthrough = false;
    }

    var deferred = $q.defer();

    //If Passthrough is being used, build that GET request
    if(EnablePassthrough) {
      NewsFeedURL = "http://127.0.0.1:5000/passthrough_xml?url="+NewsFeedURL;
    }

    //Get the latest XML Feed
    $http.get(NewsFeedURL).then(function(SuccessResponse) {
      var x2js = new X2JS();
      ProcessedFeed = x2js.xml_str2json(SuccessResponse.data);

      console.debug("SuccessResponse", SuccessResponse);
      console.debug("ProcessedFeed", ProcessedFeed.rss.channel);

      deferred.resolve(ProcessedFeed.rss.channel);
    }, function(ErrorResponse) {
      console.debug("Error", ErrorResponse);
    });

    return deferred.promise;
  };

  return service;
});
