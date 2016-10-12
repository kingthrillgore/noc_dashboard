/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("tabsController", function($scope, $localStorage, $sessionStorage, $interval, Popeye) {
  $scope.pageInit = function() {
    //Initalize Settings from existing LocalStorage. Otherwise, switch to defaults
    if(typeof $localStorage.settings !== undefined) {
      $scope.settings = $localStorage.settings;
    } else {
      $scope.settings.cycleTime = 10;
    }

    $scope.cycleThroughScreens();
  };

  $scope.mouseOverDetect = function(data) {
    console.debug("data", data);
    console.log("Function Fired");
  };

  $scope.openSettings = function() {
    var SettingsModal = Popeye.openModal({
      templateUrl: 'js/main/tabs/templates/settings-modal.html',
      controller: 'tabsController as cntrl',
      resolve: {

      }
    });

    $scope.showLoading = true;
    SettingsModal.resolved.then(function() {
      $scope.showLoading = false;
    });

    SettingsModal.closed.then(function() {

    });

  };

  $scope.saveApplicationSettings = function() {
    //Validate settings
    if(typeof $scope.settings.cycleTime === undefined) {
      $scope.settings.cycleTime = 10;
    }

    //TODO if still set to do so, re-initalize cycleThroughScreens()

    //Save changes to localStorage
    $localStorage.settings = $scope.settings;

    //Close modal
    Popeye.closeCurrentModal();
  };


  $scope.cycleThroughScreens = function() {
    var intervalTimerMillisec = $scope.settings.cycleTime * 1000;

    $interval(
      function() {
        $scope.changeScreen();
      }, intervalTimerMillisec);
  };

  $scope.changeScreen = function() {
    //TODO Get all rules from the router

    //TODO Switch to the next page

    console.debug("SetInterval firing", moment());
  };
});
