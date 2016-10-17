/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("jenkinsController", function($scope, jenkinsFactory, settings) {
  $scope.jenkins = {};
  $scope.jenkins.jobs = {
    successful: {},
    failed: {},
    missing: 0
  };
  $scope.jenkins.settings = settings;

  $scope.pageInit = function() {
    $scope.getAllJobs($scope.jenkins.settings.jenkins_api_url);
  };

  $scope.getAllJobs = function(JenkinsURL) {
    jenkinsFactory.getAllJobs(JenkinsURL).then(function(Response) {
      angular.forEach(Response.jobs, function(value, key) {
        $scope.jenkins.originName = value.name;
        jenkinsFactory.getJobDetails(JenkinsURL, value.name, "lastBuild").then(function (Response2) { //, "lastBuild"
          console.debug("Build Record", Response2);
          if(Response2.result === "SUCCESS") {
            $scope.jenkins.jobs.successful[value.name] = Response2;
          } else if (Response2.result === "ABORTED") {
            $scope.jenkins.jobs.failed[value.name] = Response2;
          } else {
            $scope.jenkins.jobs.missing++;
          }
        });
      });
    });
  };

  /*$scope.getAllFailedJobs = function(JenkinsURL) {
    jenkinsFactory.getAllJobs(JenkinsURL).then(function(Response) {
      angular.forEach(Response.jobs, function(value, key) {
        $scope.jenkins.originName = value.name;
        jenkinsFactory.getJobDetails(JenkinsURL, value.name, "lastBuild").then(function (Response2) {
          $scope.jenkins.jobs.successful[value.name] = Response2;
        });
      });
    });
  };*/
});
