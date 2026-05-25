from pydantic import BaseModel
from db.model import UserRole

class RegisterRequest(BaseModel):
    username: str
    role: UserRole

class UserResponse(BaseModel):
    user_id: str
    username: str
    role: UserRole
    user_email: str
    
    class Config:
        from_attributes = True
