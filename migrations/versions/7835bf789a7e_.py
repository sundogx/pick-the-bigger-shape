"""empty message

Revision ID: 7835bf789a7e
Revises: 
Create Date: 2018-01-05 17:01:45.625145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7835bf789a7e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('testtable',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('last_modified', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('name',sa.String(256),nullable = False),
    sa.Column('score',sa.Integer(),nullable = False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('last_modified', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('testtable')
    # ### end Alembic commands ###
