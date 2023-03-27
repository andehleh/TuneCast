from pydantic import BaseModel
from .client import Queries

class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries(Queries):

    def get(self, email, str) -> AccountOutWithPassword:

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
