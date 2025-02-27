import { useEffect } from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import Input from "./components/Input";
import { useWeather } from "./context/Context";

function App() {
  const weather = useWeather();
  const {
    fetchCurrentUserLocationData,
    fetchData,
    suggestions,
    fetchSevendays,
  } = weather;
  // console.log(weather, "---app.jsx weather");

  useEffect(() => {
    fetchCurrentUserLocationData();
  }, []);

  useEffect(() => {
    fetchData();
    fetchSevendays();
  }, [suggestions]);

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <Input />
      <Button onClick={fetchData} value="Search" />
      <Card />
    </div>
  );
}

export default App;
