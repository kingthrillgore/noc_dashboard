/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("newsController", function($scope, newsFactory, settings) {
  $scope.pageInit = function() {
    $scope.getHeadlines();
  };

  $scope.getHeadlines = function(numHeadlines) {
    //Validation
    if(typeof numHeadlines !== "number") {
      numHeadlines = 10;
    }

    console.log("Call made");
    newsFactory.getLatestHeadlines("http://rss.cnn.com/rss/cnn_topstories.rss", true).then(function(SuccessResponse) {
      console.debug("SuccessResponse", SuccessResponse);
      //Trim Items down to number specified.
    }, function(ErrorResponse) {
      console.debug("ErrorResponse", ErrorResponse);
    });
  };
});
