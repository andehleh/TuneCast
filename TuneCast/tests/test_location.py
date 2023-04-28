from fastapi.testclient import TestClient
from main import app
from queries.location import LocationRepo
from models import Location

client = TestClient(app)



class FakeLocationRepo:
    def get_location(self, lon: float, lat: float):

        return {
          "city": "Dallas",
          "principalSubdivisionCode": "US-TX"
        }


def test_get_location():
    app.dependency_overrides[LocationRepo] = FakeLocationRepo
    lon = -97.1082727
    lat = 32.6137264

    res = client.get(f'/api/location/{lon}_{lat}')
    data = res.json()

    assert res.status_code == 200
    assert type(data) == dict

    app.dependency_overrides = {}
