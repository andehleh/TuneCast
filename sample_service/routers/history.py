from fastapi import APIRouter

router = APIRouter()

@router.post('/api/history/')
async def create_history():
    pass


@router.get('/api/history/')
async def list_history():
    pass


@router.delete('api/history/{id}')
async def delete_history():
    pass

