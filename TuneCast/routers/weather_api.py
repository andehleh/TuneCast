from fastapi import APIRouter, Depends
from models import OpenWeatherAPIOut
from queries.weather_api import OpenWeatherRepo, OpenWeatherGeoRepo

router = APIRouter()


@router.get(
    "/api/open_weather_api/{city}/{state}/", response_model=OpenWeatherAPIOut
)
def get_weather(city: str, state: str, repo: OpenWeatherRepo = Depends()):
    return repo.get_current_weather(city, state)


@router.get("/api/open_weather_api/{lon}_{lat}/")
def get_weather(lon: float, lat: float, repo: OpenWeatherGeoRepo = Depends()):
    return repo.get_current_weather(lon, lat)
