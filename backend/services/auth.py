from fastapi import Request, Depends, HTTPException, Response
import sqlalchemy.orm as sqlalchemyorm
from db.model import t_users
from datetime import datetime
from db.model import Session, t_users

def firebase_auth(payload: dict, response: Response, db: sqlalchemyorm.Session = Depends(get_db)):
    token = payload.get("token")

    decoded = verify_firebase_token(token)
    if not decoded:
        raise HTTPException(401, "Invalid token")

    uid = decoded["uid"]
    email = decoded.get("email")
    name = decoded.get("name", "user")

    user = db.query(User).filter(User.user_id == uid).first()

    if not user:
        user = t_users(
            user_id=uid,
            username=name,
            role="student",
            user_email=email
        )
        db.add(user)
        db.commit()

    session_id = create_session(db, user.user_id)

    response.set_cookie(
        key="session_id",
        value=session_id,
        httponly=True,
        secure=True,
        samesite="Lax"
    )

    return {"message": "Authenticated"}

def get_current_user(request: Request, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(401, "No session")
    session = db.query(Session).filter(Session.session_id==session_id).first()
    if not session:
        raise HTTPException(401, "Invalid Session")
    if session.expires_at < datetime.now().astimezone():
        db.delete(session)
        db.commit()
        raise HTTPException(401, "Session expired")
    user = db.query(t_users).filter(t_users.user_id == session.user_id).first()

    return user

def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")

    if session_id:
        db.query(Session).filter(
            Session.session_id == session_id
        ).delete()
        db.commit()

    response.delete_cookie("session_id")

    return {"message": "Logged out"}

def get_user(user: t_users = Depends(get_current_user)):
    return{
        "user_id":user.user_id,
        "email":user.email,
        "role":user.role
    }