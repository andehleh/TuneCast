from queries.client import Queries
from models import AccountIn, AccountOutWithHashedPassword


class DuplicateAccountError(Exception):
    pass


class AccountsRepo(Queries):
    COLLECTION = "accounts"

    def create(self, info: AccountIn, hashed_password: str):
        account = info.dict()
        account["hashed_password"] = hashed_password
        if self.get(account["username"]):
            raise DuplicateAccountError
        self.collection.insert_one(account)
        account["id"] = str(account["_id"])
        return AccountOutWithHashedPassword(**account)

    def get(self, username: str):
        result = self.collection.find_one({"username": username})
        if result is None:
            return None
        result["id"] = str(result["_id"])
        return AccountOutWithHashedPassword(**result)

    def get_all(self):
        accounts = []
        for account in self.collection.find():
            account["id"] = str(account["_id"])
            accounts.append(AccountOutWithHashedPassword(**account))

        return accounts
