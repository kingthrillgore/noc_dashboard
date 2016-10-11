/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.directive('panelItem', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      nagiosItem: '=response'
    },
    templateUrl: 'js/main/system/templates/panelItem.html'
  };
});
