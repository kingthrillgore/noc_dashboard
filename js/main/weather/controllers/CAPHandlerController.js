/**
 * @file Polls and handles CAP Feeds
 * @author Cameron Kilgore
 */

nocDashboard.controller('CAPHandlerController', ['$scope', function($scope, $weatherFactory, $weatherService) {
  /**
   * Contacts the NWS Service and gets all the CAP feeds. Based on the alert levels
   * defined in the parameter alert level, those that match those entries are
   * saved to LocalStorage, and returned as a Promise so another function can
   * intercept and handle the response.
   * @param {string} AlertLevel Array representation of the Alert Level based
   * on the NAB standard for Event Level (ADV, WCH, WRN, TEST). If undefined,
   * it defaults to Warnings only (WRN). Array items must be strings
   * @return {[type]} [description]
   */
  $scope.update = function(AlertLevel) {
    if(AlertLevel !== array) {
      AlertLevel = ["WRN"];
    }


  };

  /**
   * Removes all caches CAP records
   * @return {[type]} [description]
   */
  $scope.delete = function() {

  };
}]);
