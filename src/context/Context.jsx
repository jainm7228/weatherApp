import { createContext, useContext, useState } from "react";
import { getWeatherDataForCity } from "../api";
import { getWeatherDataForLocation } from "../api";

const WeatherContext = createContext();
export const useWeather = () => {
  return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState(null);

  const fetchData = async () => {
    const response = await getWeatherDataForCity(searchCity);
    setData(response);
  };
  const fetchCurrentUserLocationData = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      getWeatherDataForLocation(
        (position.coords.latitude, position.coords.longitude)
      ).then((data) => setData(data));
    });
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
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
