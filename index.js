// Open-Meteo test fetch (Richmond, VA approx)
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=37.5407&longitude=-77.4360&current=temperature_2m,weather_code";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("API Response:", data);
    // Two data points I can later display:

    // data.current.temperature_2m
    // data.current.weather_code
  })
  .catch((error) => {
    console.error("Fetch failed:", error);
  });
console.log("JavaScript connected successfully");
