const apiUrl = "https://api.open-meteo.com/v1/forecast";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  // Use Open-Meteo's geocoding API to get latitude & longitude of city
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (!geoData.results || geoData.results.length === 0) {
    alert("City not found!");
    return;
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Get current weather
  const weatherUrl = `${apiUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  const weather = weatherData.current_weather;
  const temperature = weather.temperature;
  const windspeed = weather.windspeed;
  const weathercode = weather.weathercode;

  // Convert weather code to readable condition
  const condition = getWeatherDescription(weathercode);

  document.getElementById("result").innerHTML = `
    <h2>${name}, ${country}</h2>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
    <p><strong>Climate:</strong> ${condition}</p>
  `;
}

// Function to interpret weather code into readable text
function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear Sky ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Depositing Rime Fog 🌫️",
    51: "Light Drizzle 🌦️",
    53: "Moderate Drizzle 🌦️",
    55: "Dense Drizzle 🌧️",
    61: "Slight Rain 🌧️",
    63: "Moderate Rain 🌧️",
    65: "Heavy Rain 🌧️",
    71: "Slight Snowfall ❄️",
    73: "Moderate Snowfall ❄️",
    75: "Heavy Snowfall ❄️",
    80: "Rain Showers 🌦️",
    81: "Heavy Rain Showers ⛈️",
    82: "Violent Rain Showers ⛈️",
    95: "Thunderstorm ⛈️",
    96: "Thunderstorm with Hail 🌩️",
    99: "Severe Thunderstorm with Hail 🌩️"
  };

  return weatherCodes[code] || "Unknown Climate";
}
