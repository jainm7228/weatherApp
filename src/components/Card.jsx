import React from "react";
import { useWeather } from "../context/Context";

const Card = () => {
  const {
    forecasts,
    currentDayIndex,
    setCurrentDayIndex,
    data, // This might contain city, region, etc.
  } = useWeather();

  // Safety check if forecasts is empty or undefined
  if (!forecasts || forecasts.length === 0) {
    return <p>No forecast data available</p>;
  }

  // Current day's forecast
  const dayForecast = forecasts[currentDayIndex];

  // Handlers for pagination
  const handlePrev = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentDayIndex < forecasts.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handleDayClick = (index) => {
    setCurrentDayIndex(index);
  };

  // Extract some info (WeatherAPI structure)
  // dayForecast.day -> Contains temperature, condition, etc.
  // data.location -> Might contain city name, region, lat, lon, etc.

  const cityName = data?.location?.name;
  const regionName = data?.location?.region;
  const countryName = data?.location?.country;
  const lat = data?.location?.lat;
  const lon = data?.location?.lon;
  const localtime = data?.location?.localtime; // e.g., "2025-02-24 12:09"

  const avgTemp = dayForecast?.day?.avgtemp_c;
  const temp = data?.current?.temp_c;
  const pressure = dayForecast?.day?.avghumidity; // Not exactly pressure, just an example
  const conditionIcon = dayForecast?.day?.condition?.icon;
  const conditionText = dayForecast?.day?.condition?.text;

  return (
    <div className="forecast-container">
      {/* Single Card Display */}
      <div className="weather-card">
        {/* Weather Icon */}
        {conditionIcon && (
          <img
            src={conditionIcon}
            alt={conditionText}
            className="weather-icon"
          />
        )}

        <div className="city">{cityName}</div>
        <div className="day">DAY{currentDayIndex + 1}</div>

        <h2 className="temp">{temp}°C</h2>
        <h2 className="temp">{avgTemp}°C</h2>

        <div className="region">
          {regionName} {countryName}
        </div>

        <div className="coordinates">
          {lat} , {lon}
        </div>

        <div className="localtime">{localtime}</div>
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentDayIndex === 0}>
          Previous
        </button>

        {/* 1-7 buttons (or 1-forecasts.length if not always 7) */}
        {forecasts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(index)}
            className={currentDayIndex === index ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentDayIndex === forecasts.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
