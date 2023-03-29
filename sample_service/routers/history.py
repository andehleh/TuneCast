from fastapi import APIRouter

router = APIRouter()

@router.post('/api/history/')
async def create_history():
  pass
