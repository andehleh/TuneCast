from fastapi import APIRouter
from queries.history import History

router = APIRouter()

@router.post("/history")
def create_history(history: History):
    return history
