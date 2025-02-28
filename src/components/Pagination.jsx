import React from "react";
import { useWeather } from "../context/Context";
import "../styles/pagination.css"; // Ensure this file exists in your styles folder

const Pagination = () => {
  const { forecasts, currentDayIndex, setCurrentDayIndex } = useWeather();

  // If forecast data is not available, don't render pagination
  if (!forecasts || forecasts.length === 0) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentDayIndex((prev) => Math.max(prev - 1, 0))}
        disabled={currentDayIndex === 0}
      >
        Previous
      </button>

      {forecasts.map((day, index) => {
        // Extract the date and day of the week
        const forecastDate = day.date;
        const dateObj = new Date(forecastDate);
        console.log("date object --->", dateObj);
        const dayOfWeek = dateObj.toLocaleDateString("en-US", {
          weekday: "long",
        });

        return (
          <button
            key={index}
            className={currentDayIndex === index ? "active-page" : ""}
            onClick={() => setCurrentDayIndex(index)}
          >
            {day.day.condition?.icon && (
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
            )}
            <div>{dayOfWeek}</div>
            <div>{forecastDate}</div>
          </button>
        );
      })}

      <button
        onClick={() =>
          setCurrentDayIndex((prev) => Math.min(prev + 1, forecasts.length - 1))
        }
        disabled={currentDayIndex === forecasts.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
