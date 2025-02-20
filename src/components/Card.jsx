import React from "react";
import { useWeather } from "../context/Context";

function Card() {
  const weather = useWeather();
  console.log(weather);
  return (
    <div className="card">
      <img src={weather?.data?.current?.condition?.icon} />
      <h2>{weather.data?.current?.temp_c}</h2>
      <h2>{weather.data?.location?.name}</h2>

      <h5>
        {weather.data?.location?.region}
        {weather.data?.location?.country}
      </h5>
    </div>
  );
}

export default Card;
