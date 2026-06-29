from fastapi import APIRouter, Request, Depends, HTTPException, status
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.responses import Response
from app.schemas import RegisterRequest, UserResponse, LoginRequest, LoginResponse, ChatResponse, ChatPayload
from services.chat import model_response
from services.user import get_token, get_current_user
from app.schemas import RegisterRequest, UserResponse, LoginRequest, LoginResponse
from db.db import get_db
from services.auth import firebase_auth, firebase_register
from services.issues import get_issues

router=APIRouter()

@router.get("/")
def hello():
  return {"msg":"backend alive"}

@router.get("/user")
async def get_userid(user: Annotated[dict, Depends(get_token)]):
    return get_current_user(user,db=Depends(get_db))

@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)):
    return firebase_auth(payload, response, db)

@router.post("/register", response_model=UserResponse)
async def register(payload: RegisterRequest, response: Response, db: Session = Depends(get_db)):
    return firebase_register(payload, response, db)

@router.post("/new_ticket", response_model = ChatResponse)
async def get_model_response(payload: ChatPayload):
    raw_ai_reply = model_response(payload)
    return {'reply': raw_ai_reply}
@router.get("/issues")
async def issues_endpoint(user = Depends(get_current_user), db: Session = Depends(get_db)):
    return get_issues(user, db)
