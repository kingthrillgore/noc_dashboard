/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("newsController", function($scope, newsFactory, settings) {
  $scope.pageInit = function() {
    $scope.getHeadlines();
  };

  $scope.getHeadlines = function() {
    //newsFactory.getLatestHeadlines("http://rss.cnn.com/rss/cnn_topstories.rss");
    //newsFactory.getLatestHeadlines("http://anyorigin.com/get?url=http%3A//rss.cnn.com/rss/cnn_topstories.rss&callback=?");
    console.log("Call made");
  };
});
