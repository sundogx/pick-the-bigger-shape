# TODO INIT change the name of this file to something appropriate for this project

from flask import (
    Flask,
    render_template,
)
from sassutils.wsgi import SassMiddleware
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('config')

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    __name__: ('static/sass', 'static/css_generated', '/static/css_generated')
})

db = SQLAlchemy(app)

@app.errorhandler(404)
def not_found(error):
    return '404'

import views

