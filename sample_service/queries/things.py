from queries.client import Queries
from models import Thing, ThingParams
from bson.objectid import ObjectId


class ThingsQueries(Queries):
    COLLECTION = 'things'

    def create(self, params: ThingParams) -> Thing:
        thing = params.dict()
        self.collection.insert_one(thing)
        thing['id'] = str(thing['_id'])
        return Thing(**thing)

    def get_all(self) -> list[Thing]:
        things = []
        for thing in self.collection.find():
            thing['id'] = str(thing['_id'])
            things.append(Thing(**thing))
        return things

    def delete(self, id: str) -> bool:
        result = self.collection.delete_one({'_id': ObjectId(id)})
        return result.deleted_count == 1
