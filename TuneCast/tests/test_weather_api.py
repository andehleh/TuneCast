from fastapi.testclient import TestClient
from main import app
from queries.weather_api import OpenWeatherRepo

client = TestClient(app)

class FakeOpenWeatherRepo:
    def get_current_weather(self, city: str, state: str):
        return {
            "name": "Dallas",
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ]
        }


def test_get_current_weather():
    #Arrange
    app.dependency_overrides[OpenWeatherRepo] = FakeOpenWeatherRepo
    city = "dallas"
    state="tx"
    #Act
    res = client.get(f'/api/open_weather_api/{city}/{state}/')
    data = res.json()

    #Assert
    assert res.status_code == 200
    assert type(data) == dict

    #Cleanup
    app.dependency_overrides = {}
