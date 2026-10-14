from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()


origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 39.1451,-75.3865


@app.get("/info/{lat}/{lon}")
def get_info(lat: float, lon: float):

    url = f"https://api.weather.gov/points/{lat},{lon}"

    headers = {"User-Agent": "weather-app"}

    response = requests.get(url, headers=headers)

    return response.json()


@app.get("/location/{locationName}")
def get_location(locationName: str):

    url = f"https://geocoding-api.open-meteo.com/v1/search?name={locationName}&count=10&language=en&format=json"

    temp_location = requests.get(url)

    data = temp_location.json()

    latLon = {
        "latitude": data["results"][0]["latitude"],
        "longitude": data["results"][0]["longitude"],
    }

    return latLon


@app.get("/forecast/{locationData.latitude}/{locationData.longitude}")
def get_forecast(lat: float, lon: float):
    hourly = get_info(lat, lon)

    hourly_forecast_link = hourly["properties"]["forecastHourly"]

    hourly_forecast = requests.get(hourly_forecast_link)
    return hourly_forecast.json()
