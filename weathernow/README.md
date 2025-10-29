# Weather-Now-Web-App
Responsive web-based app that provides current weather condition of any city in the world

TechStack 
HTML5 
CSS3
JAVASCRIPT
Open-Meteo-API

Description 

WeatherNow is a responsive web application that provides real-time weather information for any city in the world.
It fetches accurate data like temperature, wind speed, and climate conditions using the Open-Meteo API.
The project can run completely on the frontend and is Mobile and Desktop freindly interface.

User Input:
The user enters a city name in the input field and clicks the “Get Weather” button.

Geocoding with Open-Meteo API:
The JavaScript script sends a request to the Open-Meteo Geocoding API (https://geocoding-api.open-meteo.com/v1/search).
This converts the city name into latitude and longitude coordinates.

Fetching Weather Data:
Using the coordinates, another request is made to the Open-Meteo Forecast API (https://api.open-meteo.com/v1/forecast).

The app retrieves the current weather data including:
Temperature (°C)
Wind speed (km/h)
Weather condition code (which represents the climate type)
JavaScript processes the returned data and displays it neatly on the screen.