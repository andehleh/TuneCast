# from fastapi.testclient import TestClient
# from main import app
# from queries.weather import WeatherRepo

# client = TestClient(app)
client = TestClient(app)


# class FakeWeatherRepo:
#     def get_all(self):
#         return [
#             {
#                 "picture_url": "string",
#                 "name": "Snowy",
#                 "id": "643057dab60549fc67c66b85"
#             }
#         ]


# def test_list_weather():
#     #Arrange
#     app.dependency_overrides[WeatherRepo] = FakeWeatherRepo
def test_list_weather():
    # Arrange
    app.dependency_overrides[WeatherRepo] = FakeWeatherRepo

#     #Act
#     res = client.get('/api/weather/')
#     data = res.json()
    # Act
    res = client.get('/api/weather/')
    data = res.json()

#     #Assert
#     assert res.status_code == 200
#     assert type(data['weather']) == list
    # Assert
    assert res.status_code == 200
    assert type(data['weather']) == list

#     #Cleanup
#     app.dependency_overrides = {}
    # Cleanup
    app.dependency_overrides = {}
