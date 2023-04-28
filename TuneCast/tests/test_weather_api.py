from fastapi.testclient import TestClient
from main import app
from queries.weather_api import OpenWeatherRepo, OpenWeatherGeoRepo

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
                    "icon": "10d",
                }
            ],
        }


class FakeOpenWeatherGeoRepo:
    def get_current_weather(self, lon: float, lat: float):
        return {
            "coord": {"lon": -97.1055, "lat": 32.6077},
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d",
                }
            ],
            "base": "stations",
            "main": {
                "temp": 65.48,
                "feels_like": 65.97,
                "temp_min": 62.47,
                "temp_max": 67.89,
                "pressure": 1008,
                "humidity": 90,
            },
            "visibility": 10000,
            "wind": {"speed": 9.22, "deg": 320},
            "clouds": {"all": 100},
            "dt": 1682719499,
            "sys": {
                "type": 2,
                "id": 2021119,
                "country": "US",
                "sunrise": 1682682275,
                "sunset": 1682730421,
            },
            "timezone": -18000,
            "id": 4709013,
            "name": "Mansfield",
            "cod": 200,
        }


def test_get_current_weather():
    # Arrange
    app.dependency_overrides[OpenWeatherRepo] = FakeOpenWeatherRepo
    city = "dallas"
    state = "tx"
    # Act
    res = client.get(f"/api/open_weather_api/{city}/{state}/")
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert type(data) == dict

    # Cleanup
    app.dependency_overrides = {}


def test_get_current_weather_lonlat():
    # Arrange
    app.dependency_overrides[OpenWeatherGeoRepo] = FakeOpenWeatherGeoRepo
    lon = -97.1082727
    lat = 32.6137264

    # Act
    res = client.get(f"/api/open_weather_api/{lon}_{lat}/")
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert type(data) == dict

    # Cleanup
    app.dependency_overrides = {}
