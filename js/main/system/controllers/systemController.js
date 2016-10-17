/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("systemController", function($scope, systemFactory, settings) {
  $scope.nagios = {};
  $scope.nagios.nagiosResponse = {};

  $scope.nagios.hosts = {};
  $scope.nagios.hosts.online = 0;
  $scope.nagios.hosts.problems = 0;
  $scope.nagios.hosts.down = 0;
  $scope.nagios.hosts.unreachable = 0;
  $scope.nagios.hosts.pending = 0;

  $scope.nagios.services = {};
  $scope.nagios.services.online = 0;
  $scope.nagios.services.problems = 0;
  $scope.nagios.services.warning = 0;
  $scope.nagios.services.critical = 0;
  $scope.nagios.services.unknown = 0;
  $scope.nagios.services.pending = 0;

  $scope.nagios.settings = settings;

  $scope.pageInit = function() {
    $scope.getSystemStatusRecords($scope.nagios.settings.nagios_api_path, $scope.nagios.settings.nagios_api_path_port);
  };

  $scope.getSystemStatusRecords = function(NagiosAPIURL, NagiosAPIPort) {
    $scope.nagios.timeOfRequest = moment().format("MMM D YYYY h:mm:ss a");
    systemFactory.getNagiosAllHostsStatus(NagiosAPIURL, NagiosAPIPort).then(function(Response) {
      console.debug("Systems Results", Response);

      //Build the Summary of Hosts based on the current_state variables in the Hosts
      angular.forEach(Response, function(value, key) {
        var hostStateInteger = parseInt(value.current_state, 10);

        if(hostStateInteger === 0) {
          $scope.nagios.hosts.online++;
        }

        if(hostStateInteger === 1) {
          $scope.nagios.hosts.online++;
          $scope.nagios.hosts.problems++;
        }

        if(hostStateInteger > 1) {
          $scope.nagios.hosts.down++;
        }

        //Build the Summary of Services based on the current_state variables in the Services
        angular.forEach(value.services, function(value2, key2) {
          var hostStateInteger = parseInt(value2.current_state, 10);
          var lastHardState = parseInt(value2.last_hard_state, 10);
          var currentAttempt = parseInt(value2.current_attempt, 10);

          //Service check scheduled

          if(hostStateInteger === 0) {
            $scope.nagios.services.online++;
          }

          if(hostStateInteger === 1) {
            $scope.nagios.services.problems++;
            $scope.nagios.services.warning++;
          }

          if(hostStateInteger === 2) {
            $scope.nagios.services.problems++;
            $scope.nagios.services.critical++;
          }

          if(hostStateInteger === 3) {
            $scope.nagios.services.problems++;
            $scope.nagios.services.unknown++;
          }
        });
      });

      //Pass the Response back to be built within directives.
      $scope.nagios.nagiosResponse = Response;
    });
  };

  //TODO
  $scope.buildStatusRecordElement = function(statusItem) {

  };
});

nocDashboard.filter("HumanReadableDateUS", function() {
  return function(unixTime) {
    var readableDate = moment.unix(unixTime).format('MMM D YYYY h:mm a');
    return readableDate;
  };
});
