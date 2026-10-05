//REMEBER TO ADD A TYPE THAT ISNT ANY TO THE HOMEPAGE WHEN YOU HAVE DATA
// ANY TYPE FOR HOMEPAGE IS A TEMP TYPE
import { useQuery } from "@tanstack/react-query";


const HomePage: any = () => {
  const getData = async () => {
    const response = await fetch("http://127.0.0.1:8000/info");
    const data = await response.json();
    return data;
  };

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["weather"],
    queryFn: getData,
  });
if(isLoading == true){
  return <h1>Loading</h1>
}
if(isError == true){
  console.log(error)
}
  console.log(data);
  
  return (
    <div>
      <h1>Weather App</h1>
      <input placeholder="Enter city" id="searchBar"></input>
      <h2>Wilimgton, DE</h2>
      <h2>65F</h2>
      <h2>cloudy</h2>
      <h1>Five Day Forecast</h1>
      <h3>Mon: 50F, Tue:80F, Wed: 76F</h3>
    </div>
  );
};

export default HomePage;
