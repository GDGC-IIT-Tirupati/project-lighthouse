from fastapi import APIRouter, Depends
from typing import Annotated
from app.user import get_token
router=APIRouter()
@router.get("/user")
async def get_userid(user: Annotated[dict, Depends(get_token)]):
    return {"id":user["uid"]}