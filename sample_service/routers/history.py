from fastapi import APIRouter, Depends
from models import HistoryIn, HistoryOut
from queries.history import HistoryRepo
from authenticator import authenticator


router = APIRouter()

@router.post('/api/history/', response_model = HistoryOut)
async def create_history( info: HistoryIn, repo: HistoryRepo = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    history = repo.create(info, user_id = account_data["id"])
    # print("******", account_data)
    return history



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
