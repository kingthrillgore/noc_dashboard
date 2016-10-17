/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("jenkinsController", function($scope, jenkinsFactory, settings) {
  $scope.jenkins = {};
  $scope.jenkins.settings = settings;

  $scope.pageInit = function() {
    $scope.getAllJobs($scope.jenkins.settings.jenkins_api_url);
  };

  $scope.getAllJobs = function(JenkinsURL) {
    jenkinsFactory.getAllJobs(JenkinsURL).then(function(Response) {
      console.debug("Jenkins All Jobs Results", Response);
      $scope.jenkins.jobs = Response;
    });
  };
});
