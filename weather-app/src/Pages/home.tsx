//REMEBER TO ADD A TYPE THAT ISNT ANY TO THE HOMEPAGE WHEN YOU HAVE DATA
// ANY TYPE FOR HOMEPAGE IS A TEMP TYPE
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { cityType, forecastType } from "../types/city";
import Night from "../images/Night.png";
import Sunny from "../images/Sunny.png";
import "../App.css";
const HomePage: any = () => {
  const [location, setLocation] = useState<string>(
    "philadelphia, Pennsylvania",
  );
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const hour = new Date().getHours();

  const getLocation = async () => {
    const response = await fetch(`http://127.0.0.1:8000/location/${location}`);
    const locationData = await response.json();
    return locationData;
  };

  const getCast = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/forecast/${locationData?.[selectedIndex]?.latitude}/${locationData?.[selectedIndex]?.longitude}`,
    );
    const castData = await response.json();
    return castData;
  };

  const { data: locationData } = useQuery<cityType[]>({
    queryKey: ["location", location],
    queryFn: getLocation,
  });

  const { data: forecastData } = useQuery<forecastType>({
    queryKey: ["forecast", selectedIndex],
    queryFn: getCast,
    enabled: locationData !== undefined,
  });

  return (
    <div className="weather-app">
      <h1 className="app-header">Weather App</h1>
      <input
        placeholder="Enter city"
        id="searchBar"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <div className="location-result">
        {locationData?.map((location, index) => (
          <button
            className="location-button"
            key={`${locationData?.[index]?.name}, ${locationData?.[index]?.admin1}, ${locationData?.[index]?.latitude},${locationData?.[selectedIndex]?.longitude}`}
            onClick={() => setSelectedIndex(index)}
          >
            {location.name}, {location.admin1}
          </button>
        ))}
      </div>
      <div className="current-weather">
      <h2 className="city-name">{locationData?.[selectedIndex]?.name}</h2>
      <h3 className="weather-subtitle">
        {locationData?.[selectedIndex]?.name}
      </h3>
      <h1 className="current-temp">
        {forecastData?.properties?.periods[0]?.temperature}
        {forecastData?.properties?.periods[0].temperatureUnit}
      </h1>
      </div>
      <div className="hourly-scroll">
        {forecastData?.properties.periods
          ?.slice(0, 13)
          .map((forecast, index) => (
            <h2 className="forecast-card" key={forecast.startTime}>
              <img
                key={"image"[index]}
                src={forecast.isDaytime === true ? Sunny : Night}
                className="forecast-icon"
              />
              <span className="forecast-temp">
                {forecast.temperature + forecast.temperatureUnit}
              </span>
              <div className="forecast-section">
                {hour === new Date(forecast.startTime).getHours()
                  ? "Now"
                  : new Date(forecast.startTime).toLocaleTimeString("en-us", {
                      hour: "numeric",
                      hour12: true,
                    })}
              </div>
            </h2>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
