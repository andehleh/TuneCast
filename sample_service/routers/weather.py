from fastapi import APIRouter, Depends
from models import WeatherIn, WeatherList, WeatherOut

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


@router.get('/api/weather/')
async def list_weather(weather: WeatherOut = Depends()):
    return {
    "weather": [
        {
            "picture_url": weather.picture_url,
            "name": weather.name,
        }
    ]
}