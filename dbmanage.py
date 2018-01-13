# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app and db are instantiated.
# For example, with hackolade, it was hackolade.py
from HelloWorld import app, db

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

