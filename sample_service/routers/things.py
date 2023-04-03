from fastapi import APIRouter, Depends
from models import Thing, ThingParams, ThingsList
from queries.things import ThingsQueries
from authenticator import authenticator

router = APIRouter()


@router.post('/api/things', response_model=Thing)
def create_thing(
    params: ThingParams,
    repo: ThingsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.create(params, user_id=account_data['id'])


@router.get('/api/things', response_model=ThingsList)
def get_all_things(
    repo: ThingsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return {
        'things': repo.get_all(user_id=account_data['id'])
    }


@router.delete('/api/things/{thing_id}', response_model=bool)
def delete_thing(
    thing_id: str,
    repo: ThingsQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return repo.delete(thing_id, user_id=account_data['id'])
