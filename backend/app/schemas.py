from pydantic import BaseModel
from typing import Optional
from db.model import UserRole

class RegisterRequest(BaseModel):
    token: str
    username: str
    user_email: str
    role: UserRole

class LoginRequest(BaseModel):
    token: str
    user_email: Optional[str] = None
    role: Optional[UserRole] = None

class UserResponse(BaseModel):
    message: str
    user_id: str
    username: str
    role: UserRole
    email: str
    
    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    message: str
