/**
 * @file Stores configuration settings used by the application
 * @author Cameron Kilgore
 */

nocDashboard.constant("settings", {
  //NOC Dashboard
  noc_dashboard_url: "http://localhost:9001",

  // ############################
  // NOC Dashboard Server
  // ############################
  use_passthrough: true,

  /*
   * Read the documentation for questions pertaining to the NOC Dashboard Server
   */
  noc_dashboard_server_url: "localhost",
  nod_dashboard_server_port: 80,

  // ############################
  // Status Monitoring/Servers
  // ############################
  enable_status: true,

  /*
   * Set to either "nagios" or "icinga2" based on the tool
   * you are using to monitor for changes
   */
  moitoring_tool: "nagios",

  //Nagios
  nagios_api_path: "http://nagios.ckilgore.local",
  nagios_api_path_port: 8080,

  //Icinga
  icinga_api_path: "http://localhost",
  icinga_api_path_port: 9002,

  /*
   * Sets the maximum number of WARNING statuses that must be
   * returned to mark a host as being in a caution state
   * (this excludes if the service reports it is based on its rules)
   */
  max_issues_before_caution: 3,

  // ##############
  // Network
  // ##############
  ntopng_url: "localhost",
  ntopng_url_port: 80,

  // ##############
  // Jenkins
  // ##############
  jenkins_api_url: "http://build.ckilgore.local",
  jenkins_api_url_port: 80,

  // ##############
  // Tickets
  // ##############

  // ##############
  // Communication
  // ##############

  // ##############
  // Weather
  // ##############
  enable_weather: true,
  enable_weather_alerts: true,

  /*
   * Set to either "nws" or "wunderground" based on where
   * you wish to fetch alerts from
   */
  weather_alerts_origin: "wunderground",

  //Wunderground API Settings
  wunderground_api_key: "d214e6a45d2888f1",
  wunderground_city: "Roswell",
  wunderground_state: "GA",

  //NWS Atom Feed Settings
  /*
   * Set this to the Zone Code for your region
   */
  cap_atom_feed_zonecode: "GAZ033",

  // ##############
  // News
  // ##############

  /*
   * Almost all the news feeds use Access-Control-Allow-Origin, so you may
   * need to force requests to tunnel through the Services Server by enabling
   * "news_use_server_passthrough and then run the Server.
   */
  news_use_server_passthrough: true,
  news_max_items: 10,

  news_feed_urls: [
    'http://rss.cnn.com/rss/cnn_world.rss'
  ]

});
