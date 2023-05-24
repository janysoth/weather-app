import { getUsers } from "../api/weatherApi.js";

// (async () => {
//   const data = await getUsers();
//   console.log(data);
//   // debugger;
//   data.forEach((user) => {
//     const comment = `<li>${user.body}</li>`;

//     document.querySelector("ul").insertAdjacentHTML("beforeend", comment);
//   });
// })();

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'd5d4f9caa31dc0bc654d876b1d629d6e';

// Select HTML elements
const searchBox = document.querySelector(".search-box");
const locationElement = document.querySelector(".location");
const tempDescription = document.querySelector(".temp-description");
const tempDetails = document.querySelector(".temp-details");

// Event listener for search box input
searchBox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getWeatherData(searchBox.value);
    searchBox.value = "";
  }
});

// Function to get weather data from API
async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();

    // Update HTML elements with weather data
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    tempDescription.textContent = data.weather[0].description;
    tempDetails.innerHTML = `
      <span class="win">Wind: ${data.wind.speed} mph</span>
      <span class="precip">Precip: ${
        data.rain ? data.rain["1h"] : 0
      } inch</span>
      <span class="pressure">Pressure: ${data.main.pressure} mb</span>
      <span class="current-temp">${convertKelvinToFahrenheit(
        data.main.temp
      )}°F</span>
    `;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to convert temperature from Kelvin to Fahrenheit
function convertKelvinToFahrenheit(kelvin) {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}




