import requests
import os
import json

OPEN_WEATHER_API_KEY = os.environ["OPEN_WEATHER_API_KEY"]


class OpenWeatherRepo:
    geocoder_url = "http://api.openweathermap.org/geo/1.0/direct"
    open_weather_url = "https://api.openweathermap.org/data/2.5/weather"

    def get_current_weather(self, city: str, state: str):
        geo_params = {
            "q": f"{city},{state},US",
            "limit": 1,
            "appid": OPEN_WEATHER_API_KEY,
        }
        geo_res = requests.get(self.geocoder_url, params=geo_params)
        geo_content = json.loads(geo_res.content)

        try:
            latitude = geo_content[0]["lat"]
            longitude = geo_content[0]["lon"]
        except (KeyError, IndexError):
            return None

        weather_params = {
            "lat": latitude,
            "lon": longitude,
            "appid": OPEN_WEATHER_API_KEY,
            "units": "imperial",
        }
        weather_res = requests.get(
            self.open_weather_url, params=weather_params)
        print("************WEATHER", weather_res.json())
        print("************LONLAT",
              weather_params['lat'], weather_params['lon'])
        try:
            return weather_res.json()
        except (KeyError, IndexError):
            return None


class OpenWeatherGeoRepo:
    url = "https://api.openweathermap.org/data/2.5/weather"

    def get_current_weather(self, lon: float, lat: float):
        weather_params = {
            "lat": lat,
            "lon": lon,
            "appid": OPEN_WEATHER_API_KEY,
            "units": "imperial",
        }
        weather_res = requests.get(self.url, params=weather_params)
        try:
            return weather_res.json()
        except (KeyError, IndexError):
            return None
