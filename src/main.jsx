// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { WeatherProvider } from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <WeatherProvider>
    <App />
  </WeatherProvider>
  // </StrictMode>
);
