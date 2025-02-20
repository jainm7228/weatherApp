import React from "react";
import { useWeather } from "../context/Context";

function Input() {
  const weather = useWeather();
  console.log(weather, "weather input file");
  return (
    <input
      className="Inputfield"
      value={weather.searchCity || ""}
      placeholder="Search City "
      onChange={(e) => weather.setSearchCity(e.target.value)}
    />
  );
}

export default Input;
