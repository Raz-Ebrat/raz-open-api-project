// First fetch: current weather data
const currentWeatherUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=37.54&longitude=-77.43&current=temperature_2m,weather_code";

fetch(currentWeatherUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Current Weather Data:", data);

    document.getElementById("temperature").innerText =
      data.current.temperature_2m + " °C";

    document.getElementById("weather").innerText = data.current.weather_code;
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Second fetch: hourly forecast data
const forecastUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=37.54&longitude=-77.43&hourly=temperature_2m";

fetch(forecastUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Forecast Data:", data);

    // Show the next hour's temperature
    document.getElementById("next-hour-temp").innerText =
      data.hourly.temperature_2m[1] + " °C";
  })
  .catch((error) => {
    console.log("Error:", error);
  });
