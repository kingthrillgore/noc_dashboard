/**
 * @file Services for polling the Jenkins REST API
 * @author Cameron Kilgore
 */

nocDashboard.factory("jenkinsFactory", function($http, $q) {
  var service = {};

  /**
   * Gets current load status on Jenkins. This is not intended to replace load
   * details reported by Icinga.
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {object}                [description]
   */
  service.getJenkinsOverallLoad = function(JenkinsRESTURL) {
    //Validation
    if(typeof JenkinsRESTURL !== "string") {
      return false;
    }

    //Build URL
    var requestURL = JenkinsRESTURL + "/overallLoad/api/json";
    var deferred = $q.defer();

    $http.get(requestURL).then(function success(response) {
      deferred.resolve(response.data);
    }, function error(response) {
      console.debug("Error", response);
    });

    return deferred.promise;
  };

  /**
   * Gets all the Jobs for the Jenkins Server and returns an array of objects
   * with the Job ID and current status based on Jenkins colors.
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {array}                [description]
   */
  service.getAllJobs = function(JenkinsRESTURL) {
    //Validation
    if(typeof JenkinsRESTURL !== "string") {
      return false;
    }

    //Build URL
    var RequestURL = JenkinsRESTURL + "/api/json?tree=jobs[name,color]";
    var deferred = $q.defer();

    $http.get(RequestURL).then(function success(response) {
      console.debug("Response", response);
      deferred.resolve(response.data);
    }, function error(response) {
      console.debug("Error", response);
    });

    return deferred.promise;
  };

  /**
   * Gets the status of the most recent build for the Job ID provided, in addition
   * to other pertinent details.
   * @param  {string} JenkinsRESTURL [description]
   * @param  {string} JobID          [description]
   * @param  {number|string} BuildType      Type of build to retrieve. Can be a build
   * number, lastBuild, lastStableBuild, lastCompletedBuild, or
   * lastSuccessfulBuild. Defaults to lastStableBuild.
   * @return {object}                [description]
   */
  service.getJobDetails = function(JenkinsRESTURL, JobID, BuildType) {
    //Init
    var useBuildPointer = false;

    //Validation
    if(typeof JenkinsRESTURL !== "string") {
      return false;
    }

    if(typeof JobID !== "string") {
      return false;
    }

    if((typeof BuildType !== "string") || (typeof BuildType !== "number")) {
      BuildType = "lastStableBuild";
    }

    if(typeof BuildType === "string") {
      switch (BuildType) {
        case "lastBuild":
          useBuildPointer = true;
          break;
        case "lastStableBuild":
          useBuildPointer = true;
          break;
        case "lastCompletedBuild":
          useBuildPointer = true;
          break;
        case "lastSuccessfulBuild":
          useBuildPointer = true;
          break;
        default:
          return false;
      }
    }

    //Build URL
    var requestURL = JenkinsRESTURL + "/job/"+JobID+"/"+BuildType+"/api/json";
    var deferred = $q.defer();

    //Get Job details from Jenkins
    $http.get(requestURL).then(function success(response) {
      deferred.resolve(response.data);
    }, function error(response) {
      console.debug("Error", response);
    });

    return deferred.promise;
  };

  /**
   * Gets the build queue from Jenkins
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {object}                [description]
   */
  service.getJenkinsBuildQueue = function(JenkinsRESTURL) {
    //Validation
    if(typeof JenkinsRESTURL !== "string") {
      return false;
    }

    //Build URL
    var requestURL = JenkinsRESTURL + "/queue/api/json";
    var deferred = $q.defer();

    $http.get(requestURL).then(function success(response) {
      deferred.resolve(response.data);
    }, function error(response) {
      console.debug("Error", response);
    });

    return deferred.promise;
  };

  //TODO Get the Build History from Jenkins

  //TODO Get all the Build Nodes (computers) from Jenkins (simple record)

  //TODO Get detailed records for a build node from Jenkins

  return service;
});
