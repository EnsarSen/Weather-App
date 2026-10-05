from fastapi import FastAPI
import requests


app  = FastAPI()

@app.get("/info")
def get_info():  
    url = "https://api.weather.gov/openapi.json"
    
    header = {
        "User-Agent": "weather-app"
    }
    
    response = requests.get(url, header = header)