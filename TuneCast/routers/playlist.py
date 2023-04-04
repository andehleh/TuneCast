from fastapi import APIRouter, Depends
from models import Playlist, PlaylistOut
from queries.playlist import PlaylistQueries

router = APIRouter()


@router.post('/api/playlist/', response_model= PlaylistOut)
def create_playlist(
    info: Playlist,
    repo: PlaylistQueries = Depends()
    ):
    playlist = repo.create(info)
    return playlist

@router.delete('/api/playlist/{id}')
def delete_playlist(
    id: str,
    repo: PlaylistQueries = Depends()
    ):
    return repo.delete(id)

@router.get('/api/playlist/')
def list_playlist(repo: PlaylistQueries = Depends()):
    return {
        "playlist": repo.get_all()
    }
