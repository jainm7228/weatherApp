const apiKey = "3583c0f70d9e4885860111432252502";
const baseURL = `https://api.weatherapi.com/v1`;
const forecastURL = `${baseURL}/forecast.json?key=${apiKey}`;
const searchURL = `${baseURL}/search.json?key=${apiKey}`;
const currentWeatherURL = `${baseURL}/current.json?key=${apiKey}`;

export const getSevenDayForecast = async (city) => {
  // const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes&alerts=no`;

  try {
    const response = await fetch(
      `${forecastURL}&q=${city}&days=7&aqi=yes&alerts=no`
    );
    if (!response.ok) throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();
    // data.forecast.forecastday will hold an array of 7 days
    return data.forecast.forecastday;
  } catch (error) {
    console.error("Error fetching 7-day forecast:", error);
    return [];
  }
};

export const getWeatherDataForCity = async (city) => {
  try {
    const response = await fetch(`${currentWeatherURL}&q=${city}&aqi=yes`);

    return await response.json();
  } catch (error) {
    console.log("error getting data for city", error);
  }
};

export const getWeatherDataForLocation = async (lat, lon) => {
  try {
    const response = await fetch(
      `${currentWeatherURL}&q=${lat},${lon}&aqi=yes`
    );

    return await response.json();
  } catch (error) {
    console.error("error fatching data for Location ", error);
  }
};

export const getCitySuggestion = async (query) => {
  if (!query) {
    console.log("enter is not entered");
    return [];
  }

  try {
    const response = await fetch(`${searchURL}&q=${query}`);
    const data = await response.json();

    if (data && data.length) {
      console.log(data, "data is suggested");
      return data.map((city) => city.name);
    } else {
      console.log("unable to suggest");
      return [];
    }
  } catch (error) {
    console.error("error fetching city suggestion:", error);
    return [];
  }
};
