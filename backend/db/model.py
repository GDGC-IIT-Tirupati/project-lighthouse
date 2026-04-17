# Using pgvector 0.4.2
from typing import Any, Optional
import datetime
import enum
import uuid

from pgvector.sqlalchemy.vector import VECTOR
from sqlalchemy import Boolean, CHAR, Column, DateTime, Enum, ForeignKeyConstraint, Integer, PrimaryKeyConstraint, String, Table, UniqueConstraint, Uuid, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class DepartmentEnum(str, enum.Enum):
    HORTICULTURE = 'horticulture'
    ENGINEERING_UNIT = 'engineering unit'


class DepartmentalRoles(str, enum.Enum):
    MANAGER = 'manager'
    WORKER = 'worker'


class IssueStatus(str, enum.Enum):
    PENDING = 'pending'
    RESOLVED = 'resolved'


class IssueVisibility(str, enum.Enum):
    PRIVATE = 'private'
    PUBLIC = 'public'


class UserRole(str, enum.Enum):
    STUDENT = 'student'
    FACULTY = 'faculty'
    STAFF = 'staff'


class IssueEvents(Base):
    __tablename__ = 'issue_events'
    __table_args__ = (
        ForeignKeyConstraint(['parent_event_id'], ['issue_events.event_id'], name='issue_events_parent_event_id_fkey'),
        PrimaryKeyConstraint('event_id', name='issue_events_pkey')
    )

    event_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    user_id: Mapped[Optional[str]] = mapped_column(CHAR(255))
    attachment_id: Mapped[Optional[str]] = mapped_column(String(255))
    metadata_: Mapped[Optional[dict]] = mapped_column('metadata', JSONB)
    type: Mapped[Optional[str]] = mapped_column(String(20))
    time_posted: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    parent_event_id: Mapped[Optional[uuid.UUID]] = mapped_column(Uuid)
    time_updated: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    is_deleted: Mapped[Optional[bool]] = mapped_column(Boolean)

    parent_event: Mapped[Optional['IssueEvents']] = relationship('IssueEvents', remote_side=[event_id], back_populates='parent_event_reverse')
    parent_event_reverse: Mapped[list['IssueEvents']] = relationship('IssueEvents', remote_side=[parent_event_id], back_populates='parent_event')


class Issues(Base):
    __tablename__ = 'issues'
    __table_args__ = (
        PrimaryKeyConstraint('issue_id', name='issues_pkey'),
    )

    issue_id: Mapped[uuid.UUID] = mapped_column(Uuid, primary_key=True)
    issue_title: Mapped[Optional[str]] = mapped_column(String(100))
    location: Mapped[Optional[str]] = mapped_column(String(10))
    time: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    visibility: Mapped[Optional[IssueVisibility]] = mapped_column(Enum(IssueVisibility, values_callable=lambda cls: [member.value for member in cls], name='issue_visibility'))
    status: Mapped[Optional[IssueStatus]] = mapped_column(Enum(IssueStatus, values_callable=lambda cls: [member.value for member in cls], name='issue_status'))
    issue_eta: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    department: Mapped[Optional[DepartmentEnum]] = mapped_column(Enum(DepartmentEnum, values_callable=lambda cls: [member.value for member in cls], name='department_enum'))
    embeddings: Mapped[Optional[Any]] = mapped_column(VECTOR(50))
    priority_score_base: Mapped[Optional[int]] = mapped_column(Integer)
    priority_score: Mapped[Optional[int]] = mapped_column(Integer)
    escalations: Mapped[Optional[int]] = mapped_column(Integer, server_default=text('0'))


t_users = Table(
    'users', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('username', String(50)),
    Column('role', Enum(UserRole, values_callable=lambda cls: [member.value for member in cls], name='user_role')),
    Column('user_email', String(255)),
    UniqueConstraint('user_id', name='user_id_unique')
)


t_comment_votes = Table(
    'comment_votes', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('issue_event_id', Uuid),
    Column('voted_at', DateTime),
    ForeignKeyConstraint(['issue_event_id'], ['issue_events.event_id'], name='comment_votes_issue_event_id_fkey'),
    ForeignKeyConstraint(['user_id'], ['users.user_id'], name='comment_votes_user_id_fkey')
)


t_department_members = Table(
    'department_members', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('department', Enum(DepartmentEnum, values_callable=lambda cls: [member.value for member in cls], name='department_enum')),
    Column('roles', Enum(DepartmentalRoles, values_callable=lambda cls: [member.value for member in cls], name='departmental_roles')),
    ForeignKeyConstraint(['user_id'], ['users.user_id'], name='department_members_user_id_fkey'),
    UniqueConstraint('user_id', name='unique_user_id')
)


t_issue_list = Table(
    'issue_list', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('issue_id', Uuid),
    ForeignKeyConstraint(['issue_id'], ['issues.issue_id'], name='issue_list_issue_id_fkey')
)


t_issue_subscriptions = Table(
    'issue_subscriptions', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('issue_id', Uuid),
    ForeignKeyConstraint(['issue_id'], ['issues.issue_id'], name='issue_subscriptions_issue_id_fkey'),
    ForeignKeyConstraint(['user_id'], ['users.user_id'], name='issue_subscriptions_user_id_fkey')
)


t_issue_votes = Table(
    'issue_votes', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('issue_id', Uuid),
    ForeignKeyConstraint(['issue_id'], ['issues.issue_id'], name='issue_votes_issue_id_fkey'),
    ForeignKeyConstraint(['user_id'], ['users.user_id'], name='issue_votes_user_id_fkey')
)


t_session = Table(
    'session', Base.metadata,
    Column('user_id', CHAR(255)),
    Column('session_id', Uuid),
    Column('created_at', DateTime),
    ForeignKeyConstraint(['user_id'], ['users.user_id'], name='session_user_id_fkey')
)


t_assignees = Table(
    'assignees', Base.metadata,
    Column('assignee_id', CHAR(255)),
    Column('issue_id', Uuid),
    Column('assigner_id', CHAR(255)),
    ForeignKeyConstraint(['assignee_id'], ['department_members.user_id'], name='assignees_assignee_id_fkey'),
    ForeignKeyConstraint(['assigner_id'], ['department_members.user_id'], name='assignees_assigner_id_fkey'),
    ForeignKeyConstraint(['issue_id'], ['issues.issue_id'], name='assignees_issue_id_fkey')
)
