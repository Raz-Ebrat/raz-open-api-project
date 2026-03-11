# WeatherScope

WeatherScope is my Open API Project for Code the Dream. It uses the Open-Meteo API to compare weather data for Richmond, Virginia and Kandahar, Afghanistan.

## About the Project

This project allows users to explore weather information through two interactive views:

- **Temperature Comparison**
- **Conditions & Time**

Each button triggers a new GET request and displays the requested weather data dynamically.

## API Used

This project uses the **Open-Meteo API**.

## Features

- Compare weather between Richmond, VA and Kandahar, Afghanistan
- View temperatures in both Celsius and Fahrenheit
- View weather conditions with icons
- Compare local times and time difference
- Responsive design for desktop, tablet, and mobile
- Separate button-based requests for different data views

## Technologies Used

- HTML
- CSS
- JavaScript
- Open-Meteo API

## Project Structure

- `index.html`
- `index.css`
- `index.js`
- `README.md`

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder in VS Code or another code editor.
3. Open `index.html` in your browser.

You can also use the Live Server extension in VS Code:

1. Open the folder in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

## How It Works

- Clicking **Temperature Comparison** sends GET requests to retrieve temperature data only.
- Clicking **Conditions & Time** sends GET requests to retrieve weather condition data and displays local time information.

## Future Improvements

- Add more cities for comparison
- Add more weather details such as humidity or wind speed
- Add more visual icons or animations
- Perform cross-browser testing in Firefox and other browsers

## Author

Raz Ebrat
