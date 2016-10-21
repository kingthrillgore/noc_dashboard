/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.controller("tabsController", function($scope, $localStorage, $sessionStorage, $interval, $route, $routeParams, $location, Popeye) {
  $scope.tabs = {
    validPaths: [],
    numberOfMenuItems: 0,
    currentActiveItem: 0,
    settings: {
      cycleTime: 0,
      showLoading: false,
    },
    initalized: false
  };

  $scope.$on('$viewContentLoaded', function () {
    console.log("Tabs view loaded");

    if($scope.tabs.initalized !== true) {
      $scope.prepForScreenCycle();
    }
  });

  $scope.pageInit = function() {
    //Initalize Settings from existing LocalStorage. Otherwise, switch to defaults
    if(typeof $localStorage.settings !== undefined) {
      $scope.tabs.settings = $localStorage.settings;
    } else {
      $scope.tabs.settings.cycleTime = 10;
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

    $scope.tabs.settings.showLoading = true;
    SettingsModal.resolved.then(function() {
      $scope.tabs.showLoading = false;
    });

    SettingsModal.closed.then(function() {

    });

  };

  $scope.saveApplicationSettings = function() {
    //Validate settings
    if(typeof $scope.settings.cycleTime === undefined) {
      $scope.tabs.settings.cycleTime = 10;
    }

    //TODO if still set to do so, re-initalize cycleThroughScreens()

    //Save changes to localStorage
    $localStorage.settings = $scope.settings;

    //Close modal
    Popeye.closeCurrentModal();
  };

  $scope.prepForScreenCycle = function() {
    if($scope.tabs.initalized !== true) {
      var menuItems = document.querySelectorAll('.navigation ul li a[data-url]');
      $scope.tabs.numberOfMenuItems = menuItems.length - 1;

      angular.forEach(menuItems, function(value, key) {
        if(typeof value.getAttribute('data-url') !== undefined) {
          $scope.tabs.validPaths.push(value.getAttribute('data-url'));
        }
      });

      $scope.tabs.initalized = true;
    }
  };

  $scope.cycleThroughScreens = function() {
    var intervalTimerMillisec = $scope.tabs.settings.cycleTime * 1000;

    $interval(
      function() {
        $scope.changeScreen();
      }, intervalTimerMillisec);
  };

  $scope.changeScreen = function() {
    var destination = "";

    if($scope.tabs.currentActiveItem < $scope.tabs.numberOfMenuItems) {
      $scope.tabs.currentActiveItem++;
      destination = "/"+$scope.tabs.validPaths[$scope.tabs.currentActiveItem];
      $location.path(destination);
    } else {
      $scope.tabs.currentActiveItem = 0;
      destination = "/"+$scope.tabs.validPaths[$scope.tabs.currentActiveItem];
      $location.path(destination);
    }
  };
});
