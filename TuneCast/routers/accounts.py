from fastapi import (
    APIRouter,
    Response,
    Depends,
    Request,
    HTTPException,
    status,
)
from models import (
    AccountIn,
    AccountForm,
    AccountToken,
    AccountOut,
    AccountList,
)
from queries.accounts import AccountsRepo, DuplicateAccountError
from authenticator import authenticator
from pydantic import BaseModel

router = APIRouter()


@router.post("/api/accounts/")
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountsRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


class Test(BaseModel):
    access_token: str
    type: str


@router.get("/token", response_model=AccountToken | Test)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | Test:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
    else:
        return {"access_token": "", "type": "Bearer"}


@router.get("/api/accounts/", response_model=AccountList)
def get_all(
    repo: AccountsRepo = Depends(),
):
    return {"accounts": repo.get_all()}
