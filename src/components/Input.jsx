import React from "react";
import { useWeather } from "../context/Context";

function Input() {
  const weather = useWeather();
  const {
    searchCity,
    setSearchCity,
    fetchCitySuggestions,
    suggestions,
    setSuggestions,
  } = weather;

  // console.log(weather, "weather input file");
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(value, "handle Input value we get ");
    setSearchCity(value);
    fetchCitySuggestions(value);
    // console.log("-----fetching city suggetionss result");
  };
  const handleSuggestionClick = (city) => {
    console.log("----clicked suggestion");
    setSearchCity(city);
    setSuggestions([]);
  };

  return (
    <div className="input-container">
      <input
        className="input-field"
        value={searchCity || ""}
        placeholder="Search City"
        onChange={handleInputChange}
      />

      {/* Show Dropdown */}
      {suggestions.length > 0 && (
        <div className="dropdown">
          {suggestions.map((city, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Input;
