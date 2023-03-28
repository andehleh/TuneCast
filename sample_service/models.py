from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token



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


class ThingParams(BaseModel):
    name: str


class Thing(ThingParams):
    id: str


class ThingsList(BaseModel):
    things: list[Thing]
