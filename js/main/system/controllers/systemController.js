/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("systemController", function($scope, systemFactory) {
  $scope.pageInit = function() {
    $scope.getSystemStatusRecords("http://nagios.ckilgore.local", 8080);
  };

  $scope.getSystemStatusRecords = function(NagiosAPIURL, NagiosAPIPort) {
    systemFactory.getNagiosAllHostsStatus(NagiosAPIURL, NagiosAPIPort).then(function(Response) {
      console.debug("Results", Response);

      //Pass the Response back to be built within directives.
    });
  };

  $scope.buildStatusRecordElemment = function(statusItem) {

  };
});
