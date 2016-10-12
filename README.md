# NOC Dashboard
This is an HTML5-based dashboard intended for use inside a Company's NOC or On Call operations area. It is intended to

## Requirements

### Systems Monitor (Nagios)
To use the Systems monitor, you need to use Nagios 3, 4, or XI with the (nagios-api)[https://github.com/zorkian/nagios-api] application, or else there is no way to get Nagios data to the dashboard.

### Systems Monitor (Icinga)
If you are using systems-icinga, then you need nothing else. Icinga2 has its own REST Service. Just define those settings in config.js.

## Weather
For the Weather monitor, you will need a [Weather Underground API Key](https://www.wunderground.com/weather/api) of "Cumulus" type. For testing purposes you should be able to use the free Developer key. However once you deploy this in an enterprise, you are required to pay for a license. There is currently no free weather API integration (if you want to help, check out open issues).

### Weather Alerts
To receive Severe Weather Alerts, you can use either Weather Underground or the NWS CAP Feeds. By default, the alerts are set to [pull from Wunderground](https://www.wunderground.com/weather/api/d/docs?d=data/alerts).

Regardless of what mechanism you use, you can configure what kind of alerts are displayed by changing config.js to match the definitions defined in weather_alerts.md. By default its set to warnings only, which covers all the Wunderground alert types and alerts considered WARN classification by the FCC/CEA Alerts Working Group.

Weather Alerts are not supported for Europe using either mechanism. If you are not a EU user, set "ENABLE_WEATHER_ALERTS" to false. If you are an EU user and can help with this, check the open ticket.

#### NWS Alerts
To use the NWS Feeds, you will need to get [the FIPS code for your region](http://www.nws.noaa.gov/nwr/coverage/county_coverage.html). These alerts have substantially more detail than Wunderground, and cover every possible warning considered part of the EAS SAME Standard.

All codes excluding EAN/EAT are covered by this service. The NWS does not provision support for these codes. It goes without saying that if the EAS is activated, running a NOC will be the least of your concerns.

### Network
TBD

### Tickets
By default, the system will parse Redmine, Trac, and OpenProject tickets from RSS feeds, once defined in the config.js.

For JIRA, you will need to use the REST API. If available, WebSockets via OAuth is available as well. See configuration_jira.md for details. This has been configured for JIRA 7.4 OnDemand and Standalone.

### Jenkins
TBD

## Installation
To install, clone this git repo, unpack to a web server, and then install Bower dependencies.

## License
Available under the terms of the MIT License. See LICENSE.md.