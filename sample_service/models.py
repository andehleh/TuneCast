from pydantic import BaseModel


class ThingParams(BaseModel):
    name: str


class Thing(ThingParams):
    id: str


class ThingsList(BaseModel):
    things: list[Thing]


