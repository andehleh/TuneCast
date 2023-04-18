from fastapi import APIRouter, Depends
from models import WeatherAPIOut, OpenWeatherAPIOut
from queries.weather_api import WeatherAPIRepo, OpenWeatherRepo

router = APIRouter()

@router.get('/api/weather_api/', response_model=WeatherAPIOut)
def get_weather(
    location: str,
    repo: WeatherAPIRepo = Depends()
):
  return repo.get_current_weather(location)

@router.get('/api/open_weather_api/', response_model=OpenWeatherAPIOut)
def get_weather(
    city: str,
    state: str,
    repo: OpenWeatherRepo = Depends()
):
  return repo.get_current_weather(city, state)
