# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app and db are instantiated.
# For example, with hackolade, it was hackolade.py
from HelloWorld import app, db
from flask import jsonify
from flask import redirect, render_template, request
import constants as const
import json
import model
from model import User

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

@app.route('/leaders')
def leaders():
    all = User.query.filter(User.score>0).all()
    scores=[[int(user.score),str(user.name)] for user in all]
    scores.sort(reverse = True)
    leaders=[]
    for i in range(10):
        if(i<len(scores)):
            leaders.append([scores[i][1],scores[i][0]])
    print(json.dumps(leaders))
    return render_template('leaders.html',leaders= json.dumps(leaders))

@app.route('/score', methods=['POST'])
def add_score():
    assert request.method == 'POST'
    score = request.form['score']
    name = request.form['name']
    if (int(score) < 980):
        tt = model.User(name,score)
        db.session.add(tt)
        db.session.commit()
    return ('', 204) # empty response

