from fastapi import APIRouter
from models import WeatherIn, WeatherList

router = APIRouter()

@router.post('/api/weather/')
async def create_weather(weather: WeatherIn):
    return {
        "weather": [
            {
                "picture_url": weather.picture_url,
                "name": weather.name,
            }
        ]
    }


@router.put('/api/weather/{id}')
async def update_weather(id: int, weather: WeatherIn):
    return {
        "weather": [
            {
                "picture_url": weather.picture_url,
                "name": weather.name,
            }
        ]
    }


@router.delete('/api/weather/{id}')
async def delete_weather(id: int):
    return {
        "weather": [
            {
                "picture_url": "weather.picture_url",
                "name": "weather.name",
            }
        ]
    }
