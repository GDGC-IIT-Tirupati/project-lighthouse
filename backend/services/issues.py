import os
from typing import Annotated
from fastapi import Request, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.db import get_db
from db.model import Session, User, UserRole, Issues, t_issue_list
import sqlalchemy.orm as sqlalchemyorm
from services.user import get_token, get_current_user


bearer_token=HTTPBearer(auto_error=False)

def get_issues(user, db: sqlalchemyorm.Session = Depends(get_db)):
    issues = (
        db.query(
            Issues.issue_id,
            Issues.issue_title,
            Issues.location,
            Issues.time,
            Issues.visibility,
            Issues.status,
            Issues.issue_eta,
            Issues.department,
            Issues.escalations
        )
        .join(t_issue_list, Issues.issue_id == t_issue_list.c.issue_id)
        .filter(t_issue_list.c.user_id == user.user_id)
        .all()
    )
    return [
        {
            "issue_id": issue.issue_id,
            "issue_title": issue.issue_title,
            "location": issue.location,
            "time": issue.time,
            "visibility": issue.visibility,
            "status": issue.status,
            "issue_eta": issue.issue_eta,
            "department": issue.department,
            "escalations": issue.escalations
        }
        for issue in issues
    ]