from fastapi import APIRouter, Depends
from models import Playlist, PlaylistOut
from queries.playlist import PlaylistRepo

router = APIRouter()


@router.post('/api/playlist/', response_model= PlaylistOut)
def create_playlist(
    info: Playlist,
    repo: PlaylistRepo = Depends()
    ):
    playlist = repo.create(info)
    return playlist

@router.delete('/api/playlist/{id}')
def delete_playlist(
    id: str,
    repo: PlaylistRepo = Depends()
    ):
    return repo.delete(id)

@router.get('/api/playlist/')
def list_playlist(repo: PlaylistRepo = Depends()):
    return {
        "playlist": repo.get_all()
    }
