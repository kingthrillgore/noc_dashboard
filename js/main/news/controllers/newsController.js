/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("newsController", function($scope, newsFactory, settings) {
  $scope.news = {
    settings: {
      'passthrough_enabled': settings.use_passthrough
    },
    news_feeds: []
  };

  $scope.newsFeedData = [];

  $scope.pageInit = function() {
    $scope.getHeadlines();
  };

  $scope.getHeadlines = function(numHeadlines) {
    //Validation
    if(typeof numHeadlines !== "number") {
      numHeadlines = 10;
    }
    var usePassthrough = false;

    //Determine if Passthrough is enabled
    if($scope.news.settings.passthrough_enabled === true) {
      usePassthrough = true;
    }

    angular.forEach(settings.news_feed_urls, function(value, key) {
      $scope.news.news_feeds.push(value);

      newsFactory.getLatestHeadlines(value, usePassthrough).then(function(SuccessResponse) {
        console.debug("SuccessResponse", SuccessResponse);

        var newsFeedItem = {
          feed_name: SuccessResponse.title,
          feed_items: []
        };

        //Trim Items down to number specified.
        newsFeedItem.feed_items = SuccessResponse.item.splice(0, settings.news_max_items);
        $scope.newsFeedData.push(newsFeedItem);
        console.debug("$scope.newsFeedData", $scope.newsFeedData);
      }, function(ErrorResponse) {
        console.debug("ErrorResponse", ErrorResponse);
      });
    });
  };
});
