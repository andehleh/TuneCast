from fastapi import APIRouter, Depends
from models import HistoryIn, HistoryOut
from queries.history import HistoryRepo


router = APIRouter()

@router.post('/api/history/')
async def create_history( info: HistoryIn, repo: HistoryRepo = Depends(),):
    history = repo.create(info)
    return {
        "history": repo.get_all()
}


@router.get('/api/history/')
async def list_history(history: HistoryOut = Depends()):
    return {
    "history": [
        {
            "date": history.date,
            "weather": history.weather,
            "playlist": history.playlist,

        }
    ]
}


@router.delete('api/history/{id}')
async def delete_history(id: int):
    return {
    "history": [
        {
            "date": "history.date",
            "weather": "history.weather",
            "playlist": "history.playlist",
            "id": "history.id"
        }
    ]
}
