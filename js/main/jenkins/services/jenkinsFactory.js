/**
 * @file Services for polling the Jenkins REST API
 * @author Cameron Kilgore
 */

nocDashboard.factory("jenkinsFactory", function($http, $q) {
  var service = {};

  //Reference URL: http://build.ckilgore.local/overallLoad/api/json
  /**
   * Gets current load status on Jenkins. This is not intended to replace load
   * details reported by Icinga.
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {object}                [description]
   */
  service.getJenkinsOverallLoad = function(JenkinsRESTURL) {

  };

  //Reference URL: http://build.ckilgore.local/api/json?tree=jobs[name,color]
  /**
   * Gets all the Jobs for the Jenkins Server and returns an array of objects
   * with the Job ID and current status based on Jenkins colors.
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {array}                [description]
   */
  service.getAllJobs = function(JenkinsRESTURL) {

  };

  //Reference URL: http://build.ckilgore.local/job/<JOB_ID>/lastBuild/api/json
  /**
   * Gets the status of the most recent build for the Job ID provided, in addition
   * to other pertinent details.
   * @param  {string} JenkinsRESTURL [description]
   * @param  {string} JobID          [description]
   * @param  {string} BuildType      Type of build to retrieve. Can be a build
   * number, lastBuild, lastStableBuild, lastCompletedBuild, or
   * lastSuccessfulBuild. Defaults to lastStableBuild.
   * @return {object}                [description]
   */
  service.getJobDetails = function(JenkinsRESTURL, JobID, BuildType) {

  };

  //Reference URL: http://build.ckilgore.local/queue/api/json?pretty=true
  /**
   * Gets the build queue from Jenkins
   * @param  {[type]} JenkinsRESTURL [description]
   * @return {object}                [description]
   */
  service.getJenkinsBuildQueue = function(JenkinsRESTURL) {

  };
});
