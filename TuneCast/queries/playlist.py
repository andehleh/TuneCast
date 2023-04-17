from queries.client import Queries
from models import Playlist, PlaylistOut
from bson import ObjectId



class PlaylistRepo(Queries):
    COLLECTION = 'playlist'

    def create(self, info:Playlist):
        playlist = info.dict()
        self.collection.insert_one(playlist)
        playlist['id'] = str(playlist['_id'])
        return PlaylistOut(**playlist)

    def get_all(self) -> list[PlaylistOut]:
        playlist_list = []
        for playlist in self.collection.find():
            playlist['id'] = str(playlist['_id'])
            playlist_list.append(PlaylistOut(**playlist))
        return playlist_list

    def delete(self, id: str) -> bool:
        result = self.collection.delete_one({'_id': ObjectId(id)})
        return result.deleted_count == 1
