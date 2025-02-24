import React from "react";
import { useWeather } from "../context/Context";

function Input() {
  const weather = useWeather();
  const { searchCity, setSearchCity, suggestions, fetchCitySuggestions } =
    useWeather();

  console.log(weather, "weather input file");
  const handleInputChange = (e) => {
    setSearchCity(e.target.value);
    fetchCitySuggestions(e.target.value);
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
    </div>
  );
}

export default Input;
