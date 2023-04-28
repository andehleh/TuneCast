from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountIn(BaseModel):
    username: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class AccountList(BaseModel):
    accounts: List[AccountOutWithHashedPassword]


class WeatherIn(BaseModel):
    picture_url: str
    name: str


class WeatherOut(WeatherIn):
    id: str


class WeatherList(BaseModel):
    weather: List[WeatherOut]


class HistoryIn(BaseModel):
    date: str
    weather: str
    playlist: str


class HistoryOut(HistoryIn):
    id: str
    user_id: str


class HistoryList(BaseModel):
    history: List[HistoryOut]


class Playlist(BaseModel):
    url: str
    name: str
    weather: str


class PlaylistOut(Playlist):
    id: str


class WeatherAPIOut(BaseModel):
    location: str
    local_time: str
    temp_c: int
    temp_f: int
    condition: str


class OpenWeatherAPIOut(BaseModel):
    name: str
    weather: list


class StateIn(BaseModel):
    abr: str


class StateOut(StateIn):
    id: str


class Location(BaseModel):
    city: str
    principalSubdivisionCode: str
