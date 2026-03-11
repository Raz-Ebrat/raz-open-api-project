// Convert Open-Meteo weather codes into readable text and icons
function getWeatherInfo(code) {
  if (code === 0) return { description: "Clear sky", icon: "☀️" };
  if (code === 1) return { description: "Mainly clear", icon: "🌤️" };
  if (code === 2) return { description: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { description: "Overcast", icon: "☁️" };
  if (code === 45 || code === 48) return { description: "Fog", icon: "🌫️" };
  if (code === 51 || code === 53 || code === 55) {
    return { description: "Drizzle", icon: "🌦️" };
  }
  if (code === 61 || code === 63 || code === 65) {
    return { description: "Rain", icon: "🌧️" };
  }
  if (code === 71 || code === 73 || code === 75) {
    return { description: "Snow", icon: "❄️" };
  }
  if (code === 95) return { description: "Thunderstorm", icon: "⛈️" };
  return { description: "Unknown", icon: "🌍" };
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Temperature-only endpoints
const richmondTemperatureUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=37.5407&longitude=-77.4360&current=temperature_2m";

const kandaharTemperatureUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=31.6289&longitude=65.7372&current=temperature_2m";

// Condition-only endpoints
const richmondConditionUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=37.5407&longitude=-77.4360&current=weather_code";

const kandaharConditionUrl =
  "https://api.open-meteo.com/v1/forecast?latitude=31.6289&longitude=65.7372&current=weather_code";

// Get HTML elements
const apiResults = document.getElementById("api-results");
const showTemperatureButton = document.getElementById("show-temperature");
const showConditionsButton = document.getElementById("show-conditions");

// Safety check
if (!apiResults || !showTemperatureButton || !showConditionsButton) {
  console.error("One or more required HTML elements were not found.");
} else {
  showTemperatureButton.addEventListener("click", loadTemperatureComparison);
  showConditionsButton.addEventListener("click", loadConditionsAndTime);
}

function loadTemperatureComparison() {
  apiResults.innerHTML = `<p class="api-placeholder">Loading temperature comparison...</p>`;

  Promise.all([
    fetch(richmondTemperatureUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Richmond temperature data");
      }
      return response.json();
    }),
    fetch(kandaharTemperatureUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Kandahar temperature data");
      }
      return response.json();
    }),
  ])
    .then(([richmondData, kandaharData]) => {
      const richmondTempC = richmondData.current.temperature_2m;
      const kandaharTempC = kandaharData.current.temperature_2m;

      const richmondTempF = celsiusToFahrenheit(richmondTempC);
      const kandaharTempF = celsiusToFahrenheit(kandaharTempC);

      const difference = Math.abs(kandaharTempF - richmondTempF).toFixed(1);

      let comparisonText = "";
      if (kandaharTempF > richmondTempF) {
        comparisonText = `Kandahar is ${difference}°F warmer than Richmond.`;
      } else if (kandaharTempF < richmondTempF) {
        comparisonText = `Kandahar is ${difference}°F cooler than Richmond.`;
      } else {
        comparisonText =
          "Kandahar and Richmond have the same temperature right now.";
      }

      apiResults.innerHTML = `
        <div class="result-grid">
          <article class="result-card">
            <h3>Richmond, VA</h3>
            <p>Temperature: <span class="highlight">${richmondTempC} °C / ${richmondTempF.toFixed(1)} °F</span></p>
          </article>

          <article class="result-card">
            <h3>Kandahar, Afghanistan</h3>
            <p>Temperature: <span class="highlight">${kandaharTempC} °C / ${kandaharTempF.toFixed(1)} °F</span></p>
          </article>

          <article class="result-card" style="grid-column: 1 / -1;">
            <h3>Temperature Comparison</h3>
            <p>${comparisonText}</p>
          </article>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Temperature fetch error:", error);
      apiResults.innerHTML = `<p class="api-placeholder">Unable to load temperature data.</p>`;
    });
}

function loadConditionsAndTime() {
  apiResults.innerHTML = `<p class="api-placeholder">Loading conditions and time data...</p>`;

  Promise.all([
    fetch(richmondConditionUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Richmond condition data");
      }
      return response.json();
    }),
    fetch(kandaharConditionUrl).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch Kandahar condition data");
      }
      return response.json();
    }),
  ])
    .then(([richmondData, kandaharData]) => {
      const richmondWeather = getWeatherInfo(richmondData.current.weather_code);
      const kandaharWeather = getWeatherInfo(kandaharData.current.weather_code);

      const richmondTimeText = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const kandaharTimeText = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kabul",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const richmondOffsetMinutes = -new Date().getTimezoneOffset();
      const kandaharOffsetMinutes = 270;
      const differenceHours =
        (kandaharOffsetMinutes - richmondOffsetMinutes) / 60;

      apiResults.innerHTML = `
        <div class="result-grid">
          <article class="result-card">
            <h3>Richmond, VA</h3>
            <p class="weather-icon">${richmondWeather.icon}</p>
            <p>Condition: <span class="highlight">${richmondWeather.description}</span></p>
            <p>Local Time: <span class="highlight">${richmondTimeText}</span></p>
          </article>

          <article class="result-card">
            <h3>Kandahar, Afghanistan</h3>
            <p class="weather-icon">${kandaharWeather.icon}</p>
            <p>Condition: <span class="highlight">${kandaharWeather.description}</span></p>
            <p>Local Time: <span class="highlight">${kandaharTimeText}</span></p>
          </article>

          <article class="result-card" style="grid-column: 1 / -1;">
            <h3>Time Difference</h3>
            <p>Kandahar is ${differenceHours} hours ahead of Richmond.</p>
          </article>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Conditions/time fetch error:", error);
      apiResults.innerHTML = `<p class="api-placeholder">Unable to load condition and time data.</p>`;
    });
}
