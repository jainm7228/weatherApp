import React from "react";
import { useWeather } from "../context/Context";

function Card() {
  const weather = useWeather();
  const { data } = weather;

  const weatherDetails = {
    City: (
      <>
        {data?.location?.name} <br />
        {data?.location?.region} <br />
        {data?.location?.country}
      </>
    ),
    // `${data?.location?.name}
    // ${data?.location?.region}
    // ${data?.location?.country}`,
    "Temperature (°C)": data?.current?.temp_c,
    "Air Quality (CO)": data?.current?.air_quality?.co,
    "lat,lon": `${data?.location?.lat},${data?.location?.lon}`,
    "Local Time": data?.location?.localtime,
  };

  // console.log(weather);
  return (
    <div className="card">
      {data?.current?.condition?.icon && (
        <img src={data.current.condition.icon} alt="Weather Icon" />
      )}

      {Object.entries(weatherDetails).map(([key, value]) =>
        value ? (
          <div key={key}>
            <strong> {key}:</strong>
            {value}
          </div>
        ) : null
      )}
    </div>
  );
}

export default Card;
