import requests
import os
import json
import base64


class SpotifyRepo:
    def get_token(self):
        profile_url = "https://accounts.spotify.com/api/token"
        request_string = (
            os.environ["SPOTIPY_CLIENT_ID"]
            + ":"
            + os.environ["SPOTIPY_CLIENT_SECRET"]
        )
        encoded_bytes = base64.b64encode(request_string.encode("utf-8"))
        encoded_string = str(encoded_bytes, "utf-8")
        form_data = {"grant_type": "client_credentials"}
        headers = {"Authorization": "Basic " + encoded_string}
        profile_resp = requests.post(
            profile_url, data=form_data, headers=headers
        )
        try:
            return profile_resp.json()
        except (KeyError, IndexError):
            print("*****************TOKEN RESPONSE ERROR")
            return None

    def get_playlist(self, token: str, weather: str):
        search_url = "https://api.spotify.com/v1/search"
        search_params = {
            "q": f"{weather}%20rock",
            "type": ["playlist"],
            "market": "US",
            "limit": 10,
        }
        headers = {"Authorization": f"Bearer {token}"}
        search_resp = requests.get(
            search_url, params=search_params, headers=headers
        )
        try:
            return search_resp.json()
        except:
            print("*****************PLAYLIST RESPONSE ERROR")
            return None
