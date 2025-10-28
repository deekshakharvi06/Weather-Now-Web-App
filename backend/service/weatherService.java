package backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
public class weatherService {

    public Map<String, Object> getWeatherData(String city) {
        RestTemplate restTemplate = new RestTemplate();

        // 1. Get coordinates of the city
        String geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city;
        Map geoResponse = restTemplate.getForObject(geoUrl, Map.class);

        if (geoResponse == null || ((ArrayList) geoResponse.get("results")).isEmpty()) {
            return Map.of("error", "City not found");
        }

        Map firstResult = (Map) ((ArrayList) geoResponse.get("results")).get(0);
        double lat = (double) firstResult.get("latitude");
        double lon = (double) firstResult.get("longitude");

        // 2. Fetch weather
        String weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
                "&longitude=" + lon + "&current_weather=true";

        Map weatherResponse = restTemplate.getForObject(weatherUrl, Map.class);
        Map currentWeather = (Map) weatherResponse.get("current_weather");

        return Map.of(
                "city", city,
                "temperature", currentWeather.get("temperature"),
                "windSpeed", currentWeather.get("windspeed")
        );
    }
}
