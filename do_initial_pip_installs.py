import subprocess
import sys

_INITIAL_INSTALL = (
    'flask',
    'flask_migrate',
    'flask_sqlalchemy',
    'libsass',
    'pymysql',
)

def main():
    # check if we're in a virtualenv, because if not, we probably don't want this to run
    assert hasattr(sys, 'real_prefix'), "if hasattr(sys, 'real_prefix') returns False, that means we're probably not inside a virtualenv"

    _call_array = ('pip', 'install') + _INITIAL_INSTALL
    print('About to call "{0}"'.format(' '.join(_call_array)))
    subprocess.call(_call_array)

if __name__ == '__main__':
    main()

