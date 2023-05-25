import { getWeatherData, getForecastData } from "../api/weatherApi.js";

// (async () => {
//   const data = await getUsers();
//   console.log(data);
//   // debugger;
//   data.forEach((user) => {
//     const comment = `<li>${user.body}</li>`;

//     document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
//   });
// })();

// Select HTML elements
const searchBox = document.querySelector(".search-box");
const locationElement = document.querySelector(".location");
const tempDescription = document.querySelector(".temp-description");
const tempDetails = document.querySelector(".temp-details");
const tempIconElement = document.querySelector(".current-temp-icon > div");
const currentTempElement = document.querySelector(".middle-section");

// Event listener for search box input
searchBox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    currentWeather(searchBox.value);
    dailyForecast(searchBox.value);
    searchBox.value = "";
  }
});

async function currentWeather(city) {
  try {
    const data = await getWeatherData(city);
    console.log(data);

    // Update HTML elements with weather data
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    tempDescription.textContent = data.weather[0].description;

    const weatherIcon = getWeatherIcon(data.weather[0].icon);
    tempIconElement.className = `fas ${weatherIcon}`;

    currentTempElement.innerHTML = `    <span class="current-temp">${convertKelvinToFahrenheit(
      data.main.temp
    )}°F</span>`;
    tempDetails.innerHTML = `
      <span class="win">Wind: ${data.wind.speed} mph</span>
      <span class="precip">Precip: ${
        data.rain ? data.rain["1h"] : 0
      } inch</span>
      <span class="pressure">Pressure: ${data.main.pressure} mb</span>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to convert temperature from Kelvin to Fahrenheit
function convertKelvinToFahrenheit(kelvin) {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}

// Function to get daily forecast data from API
async function dailyForecast(city) {
  try {
    const data = await getForecastData(city);
    console.log(data);

    // Extract the daily forecast data for the next 5 days
    const dailyForecastData = data.list.filter((forecast) =>
      forecast.dt_txt.includes("12:00:00")
    );

    // Update HTML elements with daily forecast data
    const daysElements = document.querySelectorAll(".day");
    daysElements.forEach((dayElement, index) => {
      const day = dailyForecastData[index];
      const dayOfWeekElement = dayElement.querySelector(".day-of-week");
      const tempIconElement = dayElement.querySelector(".temp-icon > div");
      const dayTempElement = dayElement.querySelector(".day-temp");

      // Update day of the week
      const date = new Date(day.dt * 1000);
      const options = { weekday: "short" };
      dayOfWeekElement.textContent = date
        .toLocaleDateString("en-US", options)
        .toUpperCase();

      // Update weather icon
      const weatherIcon = getWeatherIcon(day.weather[0].icon);
      tempIconElement.className = `fas ${weatherIcon}`;

      // Update temperature
      const temperature = convertKelvinToFahrenheit(day.main.temp);
      dayTempElement.textContent = `${temperature} °F`;
    });
  } catch (error) {
    console.error("Error fetching daily forecast data:", error);
  }
}

// Function to get the appropriate weather icon class based on the icon code
function getWeatherIcon(iconCode) {
  // Mapping object for icon codes and corresponding weather icon classes
  const iconMappings = {
    "01d": "fa-sun", // Clear sky (day)
    "01n": "fa-moon", // Clear sky (night)
    "02d": "fa-cloud-sun", // Few clouds (day)
    "02n": "fa-cloud-moon", // Few clouds (night)
    "03d": "fa-cloud", // Scattered clouds (day)
    "03n": "fa-cloud", // Scattered clouds (night)
    "04d": "fa-cloud", // Broken clouds (day)
    "04n": "fa-cloud", // Broken clouds (night)
    "09d": "fa-cloud-showers-heavy", // Shower rain (day)
    "09n": "fa-cloud-showers-heavy", // Shower rain (night)
    "10d": "fa-cloud-sun-rain", // Rain (day)
    "10n": "fa-cloud-moon-rain", // Rain (night)
    "11d": "fa-bolt", // Thunderstorm (day)
    "11n": "fa-bolt", // Thunderstorm (night)
    "13d": "fa-snowflake", // Snow (day)
    "13n": "fa-snowflake", // Snow (night)
    "50d": "fa-smog", // Mist (day)
    "50n": "fa-smog", // Mist (night)
  };

  // Check if the icon code exists in the mapping object
  if (iconCode in iconMappings) {
    return iconMappings[iconCode];
  }

  // Return a default icon class if no match is found
  return "fa-question";
}
