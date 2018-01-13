import os

from constants import IS_PROD

# TODO INIT: replace <project_name> with the name of the project name file.
# This is the file in which app is instantiated
# For example, with hackolade, it was hackolade.py
from HelloWorld import app

port = int(os.environ.get("PORT", 5000))
app.run(host='0.0.0.0', port=port, debug=not IS_PROD)

