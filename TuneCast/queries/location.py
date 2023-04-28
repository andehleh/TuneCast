import requests
import os

REVERSE_GEOCODE_API_KEY = os.environ['REVERSE_GEOCODE_API_KEY']


class LocationRepo:
    url = "https://api.bigdatacloud.net/data/reverse-geocode"

    def get_location(self, lon: float, lat: float):
        location_params = {
            "latitude": lat,
            "longitude": lon,
            "key": REVERSE_GEOCODE_API_KEY
        }
        location_res = requests.get(self.url, params=location_params)
        try:
            return location_res.json()
        except (KeyError, IndexError):
            return None
