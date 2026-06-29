import os
from typing import Annotated
from fastapi import Request, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from db.db import get_db
from db.model import Session, User, UserRole, Issues, t_issue_list
import sqlalchemy.orm as sqlalchemyorm
from services.user import get_token, get_current_user
import uuid

bearer_token=HTTPBearer(auto_error=False)

def get_issues(user, db: sqlalchemyorm.Session = Depends(get_db)):
    if (user.role == UserRole.STUDENT):
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
    elif (user.role == UserRole.STAFF):
        issues = db.query(Issues).join().filter().all()
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
        #TODO: After fixing UserRole enum, add the filter condition to only show issues relevant to the staff's department.
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User role not authorized to view issues.")

def create_issue(user, issue_data, db: sqlalchemyorm.Session = Depends(get_db)):
    new_issue = Issues(
        issue_id=str(uuid.uuid4()), #Note for future: change to defaulting to uuid4 in the schema itself.
        issue_title=issue_data.issue_title,
        location=issue_data.location,
        time=issue_data.time,
        visibility=issue_data.visibility,
        status=issue_data.status,
        issue_eta=issue_data.issue_eta,
        department=issue_data.department,
        escalations=issue_data.escalations
    )
    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)

    association = t_issue_list.insert().values(user_id=user.user_id, issue_id=new_issue.issue_id)
    db.execute(association)
    db.commit()

    return new_issue