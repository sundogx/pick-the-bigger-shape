# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app and db are instantiated.
# For example, with hackolade, it was hackolade.py
from HelloWorld import app, db
from flask import render_template
from flask import redirect
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

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/<name>/<score>')
def add(name,score):
	tt = model.User(name,score)
	db.session.add(tt)
	db.session.commit()
	return redirect('/')