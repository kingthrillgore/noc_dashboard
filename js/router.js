/**
 * @file
 * @author Cameron Kilgore
 */
nocDashboard.config(function($routeProvider) {
  $routeProvider

    //Landing page Router
    /* .when('/', {
      templateUrl: 'js/main/landing/templates/landing.html',
      controller: 'mainController'
    })

    //System Status page Router
    .when('/system', {
      templateUrl: 'js/main/system/templates/system-landing.html',
      controller: 'mainController'
    }) */

    //TODO Network Routing rule

    .when('/weather', {
      templateUrl: 'js/main/weather/templates/weather-landing.html',
      controller: 'weatherController'
    });
});
