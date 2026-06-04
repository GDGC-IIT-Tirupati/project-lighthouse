import firebase_admin
import os
from firebase_admin import credentials
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin.auth import verify_id_token

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
