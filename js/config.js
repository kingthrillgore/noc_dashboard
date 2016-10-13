/**
 * @file Stores configuration settings used by the application
 * @author Cameron Kilgore
 */

nocDashboard.constant("SETTINGS", {
  //NOC Dashboard
  "NOC_DASHBOARD_API_PATH": "http://localhost:9001",
  
  // ############################
  // Status Monitoring/Servers
  // ############################
  "ENABLE_STATUS": true,
  
  /*
   * Set to either "nagios" or "icinga2" based on the tool
   * you are using to monitor for changes
   */
  "MONITORING_TOOL": "nagios",

  //Nagios
  "NAGIOS_API_PATH": "http://localhost:8080",
  
  //Icinga
  "ICINGA_API_PATH": "http://localhost:9002",
  
  /*
   * Sets the maximum number of WARNING statuses that must be 
   * returned to mark a host as being in a caution state
   * (this excludes if the service reports it is based on its rules)
   */
  "MAX_ISSUES_BEFORE_CAUTION": 3,
  
  // ##############
  // Weather
  // ##############
  "ENABLE_WEATHER": true
  "ENABLE_WEATHER_ALERTS": true,
  
  /*
   * Set to either "nws" or "wunderground" based on where
   * you wish to fetch alerts from
   */
  "WEATHER_ALERTS_ORIGIN": "wunderground",
  
  //Wunderground API Settings
  "WUNDERGROUND_API_KEY": "N/A",
  "LOCATION_CITY": "Asheville",
  "LOCATION_STATE": "NC",
  
  //NWS Atom Feed Settings
  /*
   * Set this to the Zone Code for your region
   */
  "CAP_ATOM_FEED_ZONECODE": "GAZ033",
});
