# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app and db are instantiated.
# For example, with hackolade, it was hackolade.py
from HelloWorld import db

class Base(db.Model):
    __abstract__ = True

    id            = db.Column(db.Integer, primary_key=True)
    created       = db.Column(db.DateTime, default=db.func.current_timestamp())
    last_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

class TestTable(Base):
    __tablename__ = 'testtable'

    def __init__(self):
        pass

