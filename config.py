import os
import constants as const

# TODO INIT: replace <local_db_url> with the URL to the local database
# * if it's a mysql database, the format is 'mysql+pymysql://user@host/dbname', e.g. 'mysql+pymysql://root@localhost/dbname'
#       ** NOTE the +pymysql part!
# * if it's a postgresql database, the format is postgres:///dbname
#       ** NOTE that postgres has THREE /// while mysql has TWO // and if you get this wrong, it's possible that migrations will fail silently
#
# Also note that ".replace('mysql://', 'mysql+pymysql://')" can be removed if we're using Postgres,
# though in theory it won't hurt to keep it around
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL'].replace('mysql://', 'mysql+pymysql://') if const.IS_PROD else "mysql+pymysql://root@localhost/firsttest"
SQLALCHEMY_TRACK_MODIFICATIONS = False

DATABASE_CONNECT_OPTIONS = {}

THREADS_PER_PAGE = 2

CSRF_ENABLED = True

# TODO INIT: set this to something
CSRF_SESSION_KEY =123

# TODO INIT: set this to something
SECRET_KEY =123

