/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("tabsController", function($scope) {
  $scope.mouseOverDetect = function(data) {
    console.debug("data", data);
    console.log("Function Fired");
  };
});
