from fastapi import APIRouter, Depends
from typing import Annotated
from .user import get_token


router = APIRouter()

@router.get("/user")
async def get_userid(user: Annotated[dict, Depends(get_token)]):
    return {"id":user["uid"]}

@router.get("/")
async def root():
    return {"message": "Hello from backend!"}

@router.get("/login")
async def login():
    return {"message": "Login page"}

@router.get("/register")
async def register():
    return {"message": "Register page"}