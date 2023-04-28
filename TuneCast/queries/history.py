from queries.client import Queries
from models import HistoryIn, HistoryOut
from bson.objectid import ObjectId


class HistoryRepo(Queries):
    COLLECTION = "history"

    def create(self, info: HistoryIn, user_id: str) -> HistoryOut:
        history = info.dict()
        history["user_id"] = user_id
        self.collection.insert_one(history)
        history["id"] = str(history["_id"])
        return HistoryOut(**history)

    def get_all(self, user_id: str) -> list[HistoryOut]:
        history = []
        for h in self.collection.find({"user_id": user_id}):
            h["id"] = str(h["_id"])
            history.append(HistoryOut(**h))
        return history

    def delete(self, id: str, user_id: str):
        result = self.collection.delete_one(
            {"_id": ObjectId(id), "user_id": user_id}
        )
        return result.acknowledged
