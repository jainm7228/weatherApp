const baseURL =
  "https://api.weatherapi.com/v1/current.json?key=1942bdb2573547688a362252252002";

export const getWeatherDataForCity = async (city) => {
  try {
    const response = await fetch(`${baseURL}&q=${city}&aqi=yes`);

    return await response.json();
  } catch (error) {
    console.log("error getting data for city", error);
  }
};

export const getWeatherDataForLocation = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}&q=${lat},${lon}&aqi=yes`);

    return await response.json();
  } catch (error) {
    console.error("error fatching data for Location ", error);
  }
};

export const getCitySuggestion = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(`${baseURL}&q=${query}`);
    const data = await response.json();

    if (data && data.length) {
      return data.map((city) => city.name);
    } else {
      return [];
    }
  } catch (error) {
    console.error("error fetching city suggestion:", error);
    return [];
  }
};
