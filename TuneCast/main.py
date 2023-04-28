from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from spotipy.oauth2 import SpotifyOAuth
import os
from authenticator import authenticator
from routers import accounts, history, weather_api, location, spotify

app = FastAPI()


app.include_router(accounts.router, tags=["Accounts"])
app.include_router(history.router, tags=["History"])
app.include_router(authenticator.router, tags=["Authentication"])
# app.include_router(weather.router, tags=['Weather'])
# app.include_router(playlist.router, tags=['Playlist'])
app.include_router(weather_api.router, tags=["Weather API"])
# app.include_router(state.router, tags=['State'])
app.include_router(location.router, tags=["Location"])
app.include_router(spotify.router, tags=["Spotify"])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
