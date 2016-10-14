/**
 * @file Stores configuration settings used by the application
 * @author Cameron Kilgore
 */

nocDashboard.constant("settings", {
  //NOC Dashboard
  noc_dashboard_url: "http://localhost:9001",

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
  nagios_api_path: "http://localhost",
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
  wunderground_api_key: "N/A",
  wunderground_city: "Asheville",
  wunderground_state: "NC",

  //NWS Atom Feed Settings
  /*
   * Set this to the Zone Code for your region
   */
  cap_atom_feed_zonecode: "GAZ033",
});
