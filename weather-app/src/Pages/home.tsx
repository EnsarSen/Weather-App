import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { cityType, forecastType } from "../types/city";
import Night from "../images/Night.png";
import Sunny from "../images/Sunny.png";
import "../App.css";

const HomePage = () => {
  const [location, setLocation] = useState<string>(
    "philadelphia, Pennsylvania",
  );
  const [tempLocation, setTempLocation] = useState<string>("Philadelphia");
  const [inputValue, setInputValue] = useState<string>("");
  const [long, setLong] = useState<number>(-75.165222);
  const [lat, setLat] = useState<number>(39.952583);
  const [admin1, setAdmin1] = useState<string>("Pennsylvania");
  const hour = new Date().getHours();
  const getLocation = async (value: string) => {
    const response = await fetch(`http://127.0.0.1:8000/location/${value}`);
    const locationData = await response.json();
    return locationData;
  };

  const getCast = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/forecast/${lat}/${long}`,
    );
    const castData = await response.json();
    return castData;
  };

  const { data: locationData } = useQuery<cityType[]>({
    queryKey: ["location", inputValue],
    queryFn: () => getLocation(inputValue),
    enabled: inputValue.trim().length > 0,
  });

  /*const { data: selectedLocationData } = useQuery<cityType[]>({
    queryKey: ["location", location],
    queryFn: () => getLocation(location),
    enabled: location.trim().length > 0,
  });*/

  const { data: forecastData } = useQuery<forecastType>({
    queryKey: ["forecast", lat, long],
    queryFn: getCast,
    enabled: long !== undefined && lat !== undefined,
  });
  console.log(forecastData);

  
  return (
    <div className="weather-app">
      <div className="search-section">
        <h1 className="app-header">Weather App</h1>
        <input
          placeholder="Enter city"
          value={inputValue}
          className="search-bar"
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!/\d/.test(inputValue) && inputValue.trim() !== "") {
                setLocation(inputValue);
                setInputValue("");
              } else setLocation(location);
            }
          }}
        />
        <div className="location-result">
          {locationData
            ?.filter((city) => city.country_code === "US")
            .map((location, index) => (
              <button
                className="location-button"
                key={`${locationData?.[index]?.name}, ${locationData?.[index]?.admin1}, ${locationData?.[index]?.latitude},${locationData?.[index]?.longitude}`}
                onClick={() => {
                  setLocation(location?.name);
                  setLat(location?.latitude);
                  setLong(location?.longitude);
                  setAdmin1(location?.admin1);
                  setTempLocation(location?.name);
                  setInputValue("");
                }}
              >
                {location?.name}, {location?.admin1}
              </button>
            ))}
        </div>
      </div>
      <div className="current-weather">
        <h2 className="city-name">{tempLocation}</h2>
        <h3 className="weather-subtitle">{admin1}</h3>
        <h1 className="current-temp">
          {forecastData?.properties?.periods[0]?.temperature}
          {forecastData?.properties?.periods[0].temperatureUnit}
        </h1>
      </div>
      <div className="hourly-scroll">
        {forecastData?.properties?.periods
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
                {hour === new Date(forecast?.startTime).getHours()
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

