from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, history, weather, playlist, weather_api, state, location

app = FastAPI()


app.include_router(accounts.router, tags=['Accounts'])
app.include_router(history.router, tags=['History'])
app.include_router(authenticator.router, tags=['Authentication'])
app.include_router(weather.router, tags=['Weather'])
app.include_router(playlist.router, tags=['Playlist'])
app.include_router(weather_api.router, tags=['Weather API'])
app.include_router(state.router, tags=['State'])
app.include_router(location.router, tags=['Location'])


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "year": 2022,
#             "month": 12,
#             "day": "9",
#             "hour": 19,
#             "min": 0,
#             "tz:": "PST"
#         }
#     }
