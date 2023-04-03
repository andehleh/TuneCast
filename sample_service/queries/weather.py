from queries.client import Queries
from models import WeatherIn, WeatherOut
from bson.objectid import ObjectId


class WeatherRepo(Queries):
    COLLECTION = 'weather'

    def create(self, info: WeatherIn) -> WeatherOut:
        weather = info.dict()
        
        self.collection.insert_one(weather)
        weather['id'] = str(weather['_id'])
        return WeatherOut(**weather)

    def get_all(self) -> list[WeatherOut]:
        weather_list = []
        for weather in self.collection.find():
            weather['id'] = str(weather['_id'])
            weather_list.append(WeatherOut(**weather))
        return weather_list

    def delete(self, id: str) -> bool:
        result = self.collection.delete_one({'_id': ObjectId(id)})
        return result.deleted_count == 1
