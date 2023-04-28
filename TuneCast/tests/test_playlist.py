# from fastapi.testclient import TestClient
# from main import app
# from queries.playlist import PlaylistRepo
# from models import Playlist, PlaylistOut

# client = TestClient(app)


class FakePlaylistRepo:
    def get_all(self):
        return [
            {
                "url": "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ",
                "name": "Deep Focus",
                "weather": "Rainy",
                "id": "643d764424fea7afc46a5ae6"
            }
        ]

    def create(self, info: Playlist) -> Playlist:
        playlist = info.dict()
        playlist['id'] = '1234'
        return PlaylistOut(**playlist)


def test_list_playlist():
    # Arrange
    app.dependency_overrides[PlaylistRepo] = FakePlaylistRepo

    # Act
    res = client.get('/api/playlist/')
    data = res.json()

    # Assert
    assert res.status_code == 200
    assert type(data['playlist']) == list

    # Cleanup
    app.dependency_overrides = {}


def test_create_playlist():
    # Arrange
    app.dependency_overrides[PlaylistRepo] = FakePlaylistRepo
    playlist = {
        'url': "string",
        'name': "string",
        'weather': "string"
    }
    # Act
    res = client.post('/api/playlist/', json=playlist)

    # Assert
    assert res.status_code == 200
    assert res.json()['id'] == '1234'

    # Cleanup
    app.dependency_overrides = {}
