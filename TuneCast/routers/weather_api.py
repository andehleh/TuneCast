from fastapi import APIRouter, Depends
from models import WeatherAPIOut, OpenWeatherAPIOut
from queries.weather_api import WeatherAPIRepo, OpenWeatherRepo, OpenWeatherGeoRepo

router = APIRouter()

@router.get('/api/weather_api/', response_model=WeatherAPIOut)
def get_weather(
    location: str,
    repo: WeatherAPIRepo = Depends()
):
  return repo.get_current_weather(location)

@router.get('/api/open_weather_api/{city}/{state}/', response_model=OpenWeatherAPIOut)
def get_weather(
    city: str,
    state: str,
    repo: OpenWeatherRepo = Depends()
):
  return repo.get_current_weather(city, state)

@router.get('/api/open_weather_api/{lon}_{lat}/')
def get_weather(
    lon: float,
    lat: float,
    repo: OpenWeatherGeoRepo = Depends()
):
  return repo.get_current_weather(lon, lat)
