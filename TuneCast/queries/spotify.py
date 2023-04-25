import requests
import os
import json
import base64

class SpotifyRepo:
    profile_url = "https://accounts.spotify.com/api/token"
    def get_token(self, code: str):
        secretId = bytes(os.environ["SPOTIPY_CLIENT_ID"] + ":" + os.environ["SPOTIPY_CLIENT_SECRET"], 'utf-8')
        encoded = base64.b64encode(secretId)
        params = {
          "method": "POST",
          "body": {
            "code": code,
            "redirect_uri": os.environ['SPOTIPY_REDIRECT_URI'],
            "grant_type": 'authorization_code'
          }}
        headers = {
          'Authorization': 'Basic ' + str(encoded),
          'Content-type': 'application/x-www-form-urlencoded'
          }
          # "json": True

        profile_resp = requests.post(self.profile_url, params=params, headers=headers)
        # print("Profile Response: ", profile_resp.json())
        print("**********************", profile_resp.json())

        try:
            return profile_resp.json()
        except (KeyError, IndexError):
            print("*****************RESPONSE ERROR")
            return None
