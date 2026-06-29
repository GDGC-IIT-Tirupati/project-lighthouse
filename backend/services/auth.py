from fastapi import Request, Depends, HTTPException, Response
import sqlalchemy.orm as sqlalchemyorm
from typing import Any
import uuid
from datetime import datetime
from db.db import get_db
from db.model import Session, User, UserRole
from firebase_admin.auth import verify_id_token
from services.sessions import create_session
from app.schemas import RegisterRequest, LoginRequest

def firebase_auth(payload: LoginRequest, response: Response, db: sqlalchemyorm.Session = Depends(get_db)):
    token = payload.token
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        decoded = verify_id_token(token)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    uid = decoded["uid"]
    email = payload.user_email or decoded.get("email")
    # name = payload.username or decoded.get("name") or "user"
    
    # Map role to enum safely
    role_str = (payload.role.value if payload.role else "student").lower()
    try:
        role_enum = UserRole(role_str)
    except ValueError:
        role_enum = UserRole.STUDENT

    user = db.query(User).filter(User.user_id == uid).first()

    if not user:
        user = User(
            user_id=uid,
            # username=name,
            role=role_enum,
            user_email=email
        )
        db.add(user)
        try:
            db.commit()
            db.refresh(user)
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=400, detail=f"Authentication failed to persist user: {str(e)}")

    session_id = create_session(db, user.user_id)

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=False,  # Must be False for http://localhost development
        samesite="Lax",
        max_age=86400,  # 24 hours
    )

    return {"message": "Authenticated"}

def logout(request: Request, response: Response, db: sqlalchemyorm.Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")

    if session_id:
        try:
            session_uuid = uuid.UUID(session_id)
            db.query(Session).filter(
                Session.session_id == session_uuid
            ).delete()
            db.commit()
        except (ValueError, TypeError):
            pass

    response.delete_cookie("session_id")

    return {"message": "Logged out"}



def firebase_register(payload: RegisterRequest, response: Response, db: sqlalchemyorm.Session = Depends(get_db)):
    """
    Handle user registration with Firebase token validation.
    """
    token = payload.token
    email = payload.user_email
    username = payload.username
    role_enum = payload.role

    try:
        decoded = verify_id_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    uid = decoded.get("uid")
    if not uid:
        raise HTTPException(status_code=400, detail="Invalid token: no uid")

    # Check if user already exists
    user = db.query(User).filter(User.user_id == uid).first()
    if user:
        raise HTTPException(status_code=400, detail="User already registered")

    # Insert new user
    try:
        user = User(
            user_id=uid,
            username=username,
            role=role_enum,
            user_email=email
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

    # Create session
    try:
        session_id = create_session(db, user.user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Session creation failed: {str(e)}")

    # Set secure cookie
    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=False,  # Set to False for localhost development
        samesite="Lax",
        max_age=86400  # 24 hours
    )

    return {
        "message": "Registration successful",
        "user_id": user.user_id,
        "username": user.username,
        "email": user.user_email,
        "role": user.role
    }