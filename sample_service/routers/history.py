from fastapi import APIRouter, Depends
from models import HistoryIn, HistoryOut
from queries.history import HistoryRepo


router = APIRouter()

@router.post('/api/history/')
async def create_history( history: HistoryIn, repo: HistoryRepo = Depends(),):
    # print("******************************", repo.get_all())
    return {
        "history": repo.get_all()
    # "history": [
    #     {
    #         "date": history.date,
    #         "weather": history.weather,
    #         "playlist": history.playlist,

    #     }
    # ]
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
