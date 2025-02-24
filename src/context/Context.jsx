import { createContext, useContext, useState } from "react";
import { getCitySuggestion, getWeatherDataForCity } from "../api";
import { getWeatherDataForLocation } from "../api";

const WeatherContext = createContext();
export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchData = async () => {
    const response = await getWeatherDataForCity(searchCity);
    setData(response);
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
