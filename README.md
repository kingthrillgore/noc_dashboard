# NOC Dashboard
This is an HTML5-based dashboard intended for use inside a Company's NOC or On Call operations area. It is intended to...well...report shit.

Ideally, you can use cast-anything to spit this to a Chromecast-driven display and rock out with your box out or whatever. I'm not your dad. You can do whatever you want.

## Installation
To install, clone this git repo, unpack to a web server, and then install Bower dependencies:

```shell
$ git clone {{ repo }}
$ bower install
```

Additional features may require the companion Dashboard Server, available [here](https://bitbucket.org/internaldevck/noc_dashboard_server).

If you have issues setting up a web server to host your application, please click the Back button and find another career choice.

## Requirements

### Systems Monitor (Nagios)
To use the Systems monitor, you need to use Nagios 3, 4, or XI with the [nagios-api](https://github.com/zorkian/nagios-api) application, or else there is no way to get Nagios data to the dashboard.

There is no native Nagios 4/XI support at this time.

### Systems Monitor (Icinga)
If you are using systems-icinga, then you need nothing else. Icinga2 has its own REST Service. Just define those settings in config.js.

### Weather
For the Weather monitor, you will need a [Weather Underground API Key](https://www.wunderground.com/weather/api) of "Cumulus" type. For testing purposes you should be able to use the free Developer key. However once you deploy this in an enterprise, you are required to pay for a license. There is currently no free weather API integration (if you want to help, check out open issues).

### Weather Alerts
To receive Severe Weather Alerts, you can use either Weather Underground or the NWS CAP Feeds. By default, the alerts are set to [pull from Wunderground](https://www.wunderground.com/weather/api/d/docs?d=data/alerts).

Regardless of what mechanism you use, you can configure what kind of alerts are displayed by changing config.js to match the definitions defined in weather_alerts.md. By default its set to warnings only, which covers all the Wunderground alert types and alerts considered WARN classification by the FCC/CEA Alerts Working Group.

All codes related to the national activation of the EAS are not covered by this service. It goes without saying that if the EAS is activated, you may have bigger concerns than your job.

Weather and Weather Alerts are not supported for Europe within the current application configuration (at least, not sanely). There are open issues to address this!

#### Alternative Alert Feeds
**Alternative Alert Feeds (NWS, Meteoalarm) are currently in development.**

### Network
TBD.

ntop-ng is a requirement to view Network information.

### Tickets
By default, the system will parse JIRA, Redmine, Trac, and OpenProject tickets from RSS feeds, once defined in the config.js.

### Jenkins
Define the necessary rules to access Jenkins REST services in config.js, and make sure you have CORS headers set up on Jenkins. The [CORS Header plugin](https://wiki.jenkins-ci.org/display/JENKINS/Cors+Filter+Plugin) is really useful. 

### News
It's likely that for some News and other RSS Services, you'll need to work around Access-Control-Allow-Origin header issues. The [NOC Dashboard Server](https://bitbucket.org/internaldevck/noc_dashboard_server) was built for just this. View the steps on that project for information on installation.

Otherwise, add RSS feeds and enjoy. Feeds update as the page loads. You are 100% responsible for using the feed providers as they are intended per their licensing terms and so forth.

## License
Available under the terms of the MIT License. See LICENSE.md.