from fastapi import APIRouter, Depends
from models import StateIn, StateOut
from queries.state import StateRepo

router = APIRouter()


@router.post('/api/state/', response_model= StateOut)
def create_state(
    info: StateIn,
    repo: StateRepo = Depends()
    ):
    state = repo.create(info)
    return state

@router.delete('/api/state/{id}')
def delete_state(
    id: str,
    repo: StateRepo = Depends()
    ):
    return repo.delete(id)

@router.get('/api/state/')
def list_state(repo: StateRepo = Depends()):
    return {
        "state": repo.get_all()
    }
