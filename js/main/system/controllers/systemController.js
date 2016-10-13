/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("systemController", function($scope, systemFactory, SETTINGS) {
  $scope.nagiosResponse = {};

  $scope.pageInit = function() {
    $scope.getSystemStatusRecords("http://nagios.ckilgore.local", 8080);
  };

  $scope.getSystemStatusRecords = function(NagiosAPIURL, NagiosAPIPort) {
    systemFactory.getNagiosAllHostsStatus(NagiosAPIURL, NagiosAPIPort).then(function(Response) {
      console.debug("Results", Response);

      //Pass the Response back to be built within directives.
      $scope.nagiosResponse = Response;
    });
  };

  //TODO
  $scope.buildStatusRecordElement = function(statusItem) {

  };
});

nocDashboard.filter("HumanReadableDateUS", function() {
  return function(unixTime) {
    var readableDate = moment.unix(unixTime).format('MMM D YYYY h:MM a');
    return readableDate;
  };
});
