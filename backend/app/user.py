import firebase_admin
from firebase_admin import credentials
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin.auth import verify_id_token

bearer_scheme = HTTPBearer(auto_error=False)
def get_token(token: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)])->dict|None:
    try:
        if not token:
            raise ValueError("no token.")
        user=verify_id_token(token)
        return user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not logged in.",headers={"WWW-Authenticate": "Bearer"})
def initialize():
    cred = credentials.Certificate("path here")
    firebase_admin.initialize_app(cred)