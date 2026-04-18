import firebase_admin
import os
from firebase_admin import credentials
from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin.auth import verify_id_token

bearer_scheme = HTTPBearer(auto_error=False)


def initialize() -> None:
    # Initialize once; use default credentials unless an explicit path is provided.
    if firebase_admin._apps:
        return

    creds_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
    if creds_path:
        cred = credentials.Certificate(creds_path)
        firebase_admin.initialize_app(cred)
    else:
        raise RuntimeError("FIREBASE_CREDENTIALS_PATH is not set. Add it to backend/.env or environment variables.")


def get_token(token: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)]) -> dict:
    try:
        if not token:
            raise ValueError("no token.")

        initialize()
        user = verify_id_token(token.credentials)
        return user
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not logged in.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc