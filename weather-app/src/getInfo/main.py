from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()


origins = [
    "http://localhost:5173",  # Default Vite port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/info")
def get_info():

    url = "https://api.weather.gov/openapi.json"
    
    headers = {
        "User-Agent": "weather-app"
    }
    
    response = requests.get(url, headers = headers)
