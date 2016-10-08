/**
 * @file Stores configuration settings used by the application
 * @author Cameron Kilgore
 */

nocDashboard.constant("SETTINGS", {
  //NOC Dashboard
  "NOC_DASHBOARD_API_PATH":"http://localhost:9001",

  //Nagios/Icinga
  "NAGIOS_STATUS_PAGE" : "index.html",
  "NAGIOS_API_PATH":"http://localhost:9001",

  //NWS CAP Alerts
  "CAP_ATOM_FEED" : "https://alerts.weather.gov/cap/wwaatmget.php?x=GAZ033&y=0",

  //Wunderground API
  "WUNDERGROUND_API_KEY": "N/A",
  "LOCATION_POSTAL_CODE": 30076
});
