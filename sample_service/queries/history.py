from queries.client import Queries
from models import HistoryIn, HistoryOut

class HistoryRepo(Queries):
    COLLECTION = 'history'

    def create(self, info:HistoryIn) -> HistoryOut:
        history = info.dict()
        self.collection.insert_one(history)
        history['id'] = str(history['_id'])
        return HistoryOut(**history)

    def get_all(self, user_id: str):
        history = []
        for h in self.collection.find({"user_id": user_id}):
            h['id'] = str(h['_id'])
            history.append(HistoryOut(**h))
        return history
