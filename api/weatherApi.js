// api url
const apiKey = "d5d4f9caa31dc0bc654d876b1d629d6e";

// export const getUsers = async () => {
//   const response = await fetch(url);
//   const data = await response.json();

//   return data;
// };

export const getWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();

  return data;
};

// Function to get daily forecast data from API
export const getForecastData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
};
