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
    password: str # user's password


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class AccountList(BaseModel):
    accounts: List[AccountOutWithHashedPassword]


class ThingParams(BaseModel):
    name: str


class Thing(ThingParams):
    id: str


class ThingsList(BaseModel):
    things: list[Thing]


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
