from fastapi import APIRouter, Depends
from models import WeatherIn, WeatherList, WeatherOut
from authenticator import authenticator
from queries.weather import WeatherRepo

router = APIRouter()


@router.post('/api/weather/', response_model=WeatherOut)
async def create_weather(
    info: WeatherIn,
    repo: WeatherRepo = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data)
):
    weather = repo.create(info)
    return weather






@router.put('/api/weather/{id}')
async def update_weather(
    weather_id: str,
    info: WeatherIn,
    repo: WeatherRepo = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.update(weather_id, info)





@router.delete('/api/weather/{id}')
async def delete_weather(
    weather_id: str,
    repo: WeatherRepo = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.delete(weather_id)





@router.get('/api/weather/', response_model=WeatherList)
async def list_weather(
    repo: WeatherRepo = Depends(),
    # account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {
        "weather": repo.get_all()
    }


@router.post('/api/weather/playlists/')
async def create_weather_playlist(
    weather_name: str,
    playlist_url: str,
    repo: WeatherRepo = Depends(),
):
    return repo.create_playlist(weather_name, playlist_url)