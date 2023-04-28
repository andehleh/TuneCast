from fastapi import APIRouter, Depends
from models import HistoryIn, HistoryOut, HistoryList
from queries.history import HistoryRepo
from authenticator import authenticator


router = APIRouter()


@router.post("/api/history/", response_model=HistoryOut)
async def create_history(
    info: HistoryIn,
    repo: HistoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    history = repo.create(info, user_id=account_data["id"])
    return history


@router.get("/api/history/", response_model=HistoryList)
async def list_history(
    repo: HistoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return {"history": repo.get_all(user_id=account_data["id"])}


@router.delete("/api/history/{history_id}/")
async def delete_history(
    history_id: str,
    repo: HistoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete(history_id, user_id=account_data["id"])
