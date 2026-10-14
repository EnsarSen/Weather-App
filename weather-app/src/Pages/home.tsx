//REMEBER TO ADD A TYPE THAT ISNT ANY TO THE HOMEPAGE WHEN YOU HAVE DATA
// ANY TYPE FOR HOMEPAGE IS A TEMP TYPE
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

//const lat: number = 39.1451;
//const lon: number = -75.3865;

const HomePage: any = () => {
  const [location, setLocation] = useState<string>("new castle");

  const getLocation = async () => {
    const response = await fetch(`http://127.0.0.1:8000/location/${location}`);
    const locationData = await response.json();
    return locationData;
  };

  const getCast = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/forecast/${locationData?.latitude}/${locationData?.longitude}`,
    );
    const castData = await response.json();
    return castData;
  };

  const { data: locationData } = useQuery({
    queryKey: ["location", location],
    queryFn: getLocation,
  });

  const { data: fore } = useQuery({
    queryKey: ["forecast"],
    queryFn: getCast,
    enabled: locationData !== undefined,
  });
  console.log(locationData?.latitude);
  console.log(fore?.properties?.periods?.[0]?.temperature);

  return (
    <div>
      <h1>Weather App</h1>
      <input placeholder="Enter city" id="searchBar"></input>
      <h2>Wilimgton, DE</h2>
      <h2>65F</h2>
      <h2>cloudy</h2>
      <h1>Five Day Forecast</h1>
      <h3>Mon: 50F, Tue:80F, Wed: 76F</h3>
      <input
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
    </div>
  );
};

export default HomePage;
