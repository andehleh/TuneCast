from fastapi import APIRouter, Depends
from queries.location import LocationRepo
from models import Location

router = APIRouter()


@router.get("/api/location/{lon}_{lat}/", response_model=Location)
def get_location(lon: float, lat: float, repo: LocationRepo = Depends()):
    return repo.get_location(lon, lat)
