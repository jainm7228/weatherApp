import { createContext, useContext, useState } from "react";
import {
  getCitySuggestion,
  getSevenDayForecast,
  getWeatherDataForCity,
} from "../api";
import { getWeatherDataForLocation } from "../api";

const WeatherContext = createContext();
export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [forecasts, setForecastsData] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const fetchData = async () => {
    const response = await getWeatherDataForCity(searchCity);
    setData(response);
    setCurrentWeather(response?.current);
    setCurrentDayIndex(0);
    console.log("searchCity state fetchData fn response is :", response);
    console.log(
      "currentweather state fetchData fn response is :",
      response.current
    );
    console.log("searchCity --->", searchCity);
    console.log("data --->", data);
  };

  const fetchSevendays = async () => {
    const response = await getSevenDayForecast(searchCity);
    setForecastsData(response);
    console.log("forecast data i fetched", response);
  };
  const fetchCurrentUserLocationData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      getWeatherDataForLocation(
        position.coords.latitude,
        position.coords.longitude
      ).then((data) => setData(data));
    });
  };
  const fetchCitySuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const data = await getCitySuggestion(query);
      setSuggestions(data);
      console.log(data, "data in suggetion");
    } catch (error) {
      console.error("error fetching city suggetions:", error);
      setSuggestions([]);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        searchCity,
        data,
        setData,
        setSearchCity,
        fetchData,
        fetchCurrentUserLocationData,
        fetchCitySuggestions,
        suggestions,
        setSuggestions,
        currentWeather,
        setCurrentWeather,
        forecasts,
        setForecastsData,
        currentDayIndex,
        setCurrentDayIndex,
        fetchSevendays,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
