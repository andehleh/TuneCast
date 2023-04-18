from queries.client import Queries
from models import StateIn, StateOut
from bson import ObjectId


class StateRepo(Queries):
    COLLECTION = 'state'

    def create(self, info:StateIn):
        state = info.dict()
        self.collection.insert_one(state)
        state['id'] = str(state['_id'])
        return StateOut(**state)

    def get_all(self) -> list[StateOut]:
        state_list = []
        for state in self.collection.find():
            state['id'] = str(state['_id'])
            state_list.append(StateOut(**state))
        return state_list

    def delete(self, id: str) -> bool:
        result = self.collection.delete_one({'_id': ObjectId(id)})
        return result.deleted_count == 1
