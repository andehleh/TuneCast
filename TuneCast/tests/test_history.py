from fastapi.testclient import TestClient
from main import app
from queries.history import HistoryRepo
from models import HistoryOut
from authenticator import authenticator


client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "user"}


class FakeHistoryRepo:
    def get_all(self, user_id: str):
        return [
            {
                "date": "string",
                "weather": "string",
                "playlist": "string",
                "id": "643d764424fea7afc46a5ae6",
                "user_id": user_id,
            }
        ]

    def create(self, history: HistoryOut, user_id: str) -> HistoryOut:
        history_dict = history.dict()
        history_dict["id"] = "1234"
        history_dict["user_id"] = user_id
        return HistoryOut(**history_dict)


def test_list_history():
    app.dependency_overrides[HistoryRepo] = FakeHistoryRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    res = client.get("/api/history/")
    data = res.json()

    assert res.status_code == 200
    assert type(data["history"]) == list

    app.dependency_overrides = {}


def test_create_history():
    app.dependency_overrides[HistoryRepo] = FakeHistoryRepo
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    history = {
        "date": "string",
        "weather": "string",
        "playlist": "string",
    }
    res = client.post("/api/history", json=history)

    assert res.status_code == 200

    app.dependency_overrides = {}
