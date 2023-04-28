import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountsRepo
from models import AccountOut, AccountOutWithHashedPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountsRepo,
    ):
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountsRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithHashedPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
