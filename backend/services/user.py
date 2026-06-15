import firebase_admin
import os
from firebase_admin import credentials
from typing import Annotated, Any
import uuid
from datetime import datetime
from fastapi import Depends, HTTPException, status, Request, Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin.auth import verify_id_token
from db.db import get_db
from db.model import Session, User
import sqlalchemy.orm as sqlalchemyorm


bearer_scheme = HTTPBearer(auto_error=False)

def get_token(token: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)]) -> dict:
    try:
        if not token:
            raise ValueError("no token.")
        user=verify_id_token(token.credentials)
        return user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in.",headers={"WWW-Authenticate": "Bearer"})

def get_uid_from_token(token: str) -> str:
    if not token:
        raise ValueError("No token provided.")
    try:
        user = verify_id_token(token)
        return user['uid']
    except Exception as e:
        raise ValueError(f"Invalid token: {str(e)}")


def initialize(cred_path:str):
    try:
        if not firebase_admin._apps:
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
            else:
                firebase_admin.initialize_app()
    except Exception as e:
        print(f"Warning: Firebase initialization setup skipped: {e}")

def get_current_user(request: Request, db: sqlalchemyorm.Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(401, "No session")

    try:
        session_uuid = uuid.UUID(session_id)
    except (ValueError, TypeError):
        raise HTTPException(401, "Invalid session ID format")

    session = db.query(Session).filter(Session.session_id == session_uuid).first()
    if not session:
        raise HTTPException(401, "Invalid Session")
    now = datetime.now(session.expires_at.tzinfo) if session.expires_at.tzinfo else datetime.now()
    if session.expires_at < now:
        db.delete(session)
        db.commit()
        raise HTTPException(401, "Session expired")

    user = db.query(User).filter(User.user_id == session.user_id).first()
    return user

def get_user(user: Any = Depends(get_current_user)):
    return {
        "user_id": user.user_id,
        "email": user.user_email,
        "role": user.role
    }
