from uuid import uuid4
from datetime import datetime, timedelta
from db.model import Session

def create_session(db, user_id: str):
    session_id = str(uuid.uuid4)

    session = Session(
        user_id=user_id,
        created_at=datetime.now().astimezone(),
        session_id=session_id,
        expires_at=datetime.now().astimezone()+timedelta(days=7)
    )
    db.add(session)
    db.commit()

    return session_id