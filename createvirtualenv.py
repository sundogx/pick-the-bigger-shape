from __future__ import print_function

import argparse
import subprocess

def main():
    _parser = argparse.ArgumentParser() 
    _parser.add_argument('-p', '--python', dest='python_version', required=True)
    _parser.add_argument('env_directory_name', nargs=1)

    _flags = _parser.parse_args()
    _python_version = _flags.python_version
    _dir_to_create = _flags.env_directory_name[0]

    _call_array = ('virtualenv', '-p', _python_version, _dir_to_create)

    print('About to call:', ' '.join(_call_array))
    subprocess.call(_call_array)

if __name__ == '__main__':
    main()

