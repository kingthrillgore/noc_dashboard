# NOC Dashboard
This is an HTML5-based dashboard intended for use inside a Company's NOC or On Call operations area. It is intended to

## Requirements
To use the Systems montior, you need to use Nagios 3, 4, or XI with the (nagios-api)[https://github.com/zorkian/nagios-api] application, or else there is no way to get Nagios data to the dashboard. If you are using systems-icinga, then you need nothing else. Icinga2 has its own REST Service.

For the Weather monitor, you will need a [Weather Underground API Key](https://www.wunderground.com/weather/api) of "Cumulus" type.  For testing purposes you should be able to use the free Developer key. However once you deploy this in an enterprise, you are required to pay for a license. There is currently no free weather API integration (if you want to help, check out open issues).

To receive Severe Weather Alerts, [TODO]

## Installation
To install, clone this git repo, unpack to a web server, and then install Bower dependencies.

## License
Available under the terms of the MIT License. See LICENSE.md.
