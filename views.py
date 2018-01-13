# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app and db are instantiated.
# For example, with hackolade, it was hackolade.py
from HelloWorld import app, db

import constants as const

import model

@app.route('/testtable')
def testtable():
    tt = model.TestTable()
    db.session.add(tt)
    db.session.commit()

    return 'Hello'

@app.route('/is_prod')
def is_prod():
    return 'IS_PROD: {0}'.format(const.IS_PROD)

