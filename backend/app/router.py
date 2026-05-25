from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.user import get_token
from app.schemas import RegisterRequest, UserResponse
from db.db import get_db
from db.model import t_users


router=APIRouter()

@router.get("/")
def hello():
  return {"msg":"backend alive"}

@router.get("/user")
async def get_userid(user: Annotated[dict, Depends(get_token)]):
    return {"id":user["uid"]}

@router.post("/login")
async def login(payload: dict, response: Response, db: Session = Depends(get_db)):
    return firebase_auth(payload, response, db)

@router.post("/register")
async def register(payload: dict, response: Response, db: Session = Depends(get_db)):
    return firebase_auth(payload, response, db)