/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.factory('systemFactory', function($http, $q) {
  var service = {};

  /**
   * Returns a serialized array of Hosts on the Nagios Server.
   * @param  {[type]} NagiosAPIURL  [description]
   * @param  {[type]} NagiosAPIPort [description]
   * @return {[type]}               [description]
   */
  service.getNagiosHosts = function(NagiosAPIURL, NagiosAPIPort) {
    //Validation
    if(typeof NagiosAPIURL !== "string") {
      return false;
    }

    if(typeof NagiosAPIPort !== "number") {
      NagiosAPIPort = 6315;
    }

    var deferred = $q.defer();

    //Get Objects from API
    var requestUrl = NagiosAPIURL+":"+NagiosAPIPort+"/objects";
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Nagios API Response", SuccessResponse);
      deferred.resolve(SuccessResponse.data.content);
    }, function(ErrorResponse) {
      console.log("Somthing's gone wrong.");
      var error = {
        'error': true,
        'type': "UNKNOWN_ERROR",
        'message': "Something went wrong and we don't know what."
      };

      //return error;
      deferred.resolve(error);
    });

    return deferred.promise;
  };

  service.getNagiosAllHostsStatus = function(NagiosAPIURL, NagiosAPIPort) {
    //Validation
    if(typeof NagiosAPIURL !== "string") {
      return false;
    }

    if(typeof NagiosAPIPort !== "number") {
      NagiosAPIPort = 6315;
    }

    var deferred = $q.defer();

    //Get objects from URL
    var requestUrl = NagiosAPIURL+":"+NagiosAPIPort+"/state";
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Nagios API Response", SuccessResponse);
      if(SuccessResponse.success !== false) {
        //return SuccessResponse.data.content;
        deferred.resolve(SuccessResponse.data.content);
      } else {
        console.log("Somthing's gone wrong.");
        var error = {
          'error': true,
          'type': "UNKNOWN_ERROR",
          'message': "Something went wrong and we don't know what."
        };

        //return error;
        deferred.resolve(error);
      }
    }, function(ErrorResponse) {
      console.debug("Error", Error);
    });

    return deferred.promise;
  };

  /**
   * Returns the status record for an individual host.
   * @param  {[type]} NagiosAPIURL  [description]
   * @param  {[type]} NagiosAPIPort [description]
   * @param  {[type]} HostName      [description]
   * @return {boolean|Object}               [description]
   */
  service.getNagiosHostStatus = function(NagiosAPIURL, NagiosAPIPort, HostName) {
    //Validation
    if(typeof NagiosAPIURL !== "string") {
      return false;
    }

    if(typeof NagiosAPIPort !== "number") {
      NagiosAPIPort = 6315;
    }

    if(typeof HostName !== "string") {
      return false;
    }

    //Get Object from URL
    var requestUrl = NagiosAPIURL+":"+NagiosAPIPort+"/host/"+hostname;
    $http.get(requestUrl).then(function(SuccessResponse) {
      console.debug("Nagios API Response", SuccessResponse);
      if(SuccessResponse.success !== false) {
        return SuccessResponse.data.content;
      } else {
        console.log("Invalid host attribute passed, returning a error string");
        var error = {
          'error': true,
          'type': "INVALID_NAGIOS_HOST",
          'message': "The host name "+hostname+" does not exist."
        };

        return error;
      }
    }, function(ErrorResponse) {
      console.debug("Error", Error);
    });
  };

  return service;
});
