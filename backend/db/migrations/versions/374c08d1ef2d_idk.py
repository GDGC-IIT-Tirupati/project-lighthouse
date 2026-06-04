"""idk

Revision ID: 374c08d1ef2d
Revises: e74b2f7a6aa8
Create Date: 2026-04-17 21:47:43.829743

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '374c08d1ef2d'
down_revision: Union[str, Sequence[str], None] = 'e74b2f7a6aa8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
