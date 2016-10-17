/**
 * @file
 * @author Cameron Kilgore
 */
nocDashboard.config(function($routeProvider) {
  $routeProvider

    //Landing page Router
    .when('/', {
      templateUrl: 'js/main/system/templates/system-landing.html',
      controller: 'systemController'
    })

    //System Status page Router
    .when('/system', {
      templateUrl: 'js/main/system/templates/system-landing.html',
      controller: 'systemController'
    })

    //Network Status page
    .when('/network', {
      templateUrl: 'js/main/network/templates/network-landing.html',
      controller: 'networkController'
    })

    //Jenkins Status
    .when('/jenkins', {
      templateUrl: 'js/main/jenkins/templates/jenkins-landing.html',
      controller: 'jenkinsController'
    })

    //Weather
    .when('/weather', {
      templateUrl: 'js/main/weather/templates/weather-landing.html',
      controller: 'weatherController'
    });

    //News
    //.when('/')
});
