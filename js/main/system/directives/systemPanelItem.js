/**
 * @file
 * @author Cameron Kilgore
 */

nocDashboard.directive('panelItem', function() {
  return {
    restrict: 'E',
    replace: 'true',
    templateUrl: 'js/main/system/templates/panelItem.html'
  };
});
