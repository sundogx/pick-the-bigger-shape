# TODO INIT in theory this should work "out of the box", provided the instructions in the doc
# have been followed, but it's worth double checking.
#
# The location of the doc can be found in README

import subprocess

def main():
    db_url_line = None

    heroku_config = subprocess.Popen('heroku config:get DATABASE_URL -a hackerhousetest', stdout=subprocess.PIPE, shell = True)
    for l in heroku_config.stdout:
        l_str = l.decode('utf-8').strip()
        l_str = 'DATABASE_URL: '+ l_str
        if l_str.startswith('DATABASE_URL'):
            # this line will look something like the following:
            # DATABASE_URL:         mysql://asdfasdfasdf:blahblah@us-cdbr-iron-east-04.cleardb.net/heroku_12345678abcd
            db_url_line = l_str
            break
    else:
        raise AssertionError("Didn't find a line that started with 'DATABASE_URL'")

    assert 'mysql://' in db_url_line, 'db_url_line was {0}'.format(db_url_line)

    # db_url will look something like the following:
    # asdfasdfasdf:blahblah@us-cdbr-iron-east-04.cleardb.net/heroku_12345678abcd
    db_url = db_url_line.split('mysql://', 1)[1]

    user_and_pw, host_and_database = db_url.split('@', 1)

    user, pw = user_and_pw.split(':', 1)
    host, database_name = host_and_database.split('/', 1)

    print('User:', user)
    print('Host:', host)
    print('Database Name:', database_name)

    subprocess.call(['mysql', '-u{0}'.format(user), '-p{0}'.format(pw), '-h{0}'.format(host), database_name], shell = True)

if __name__ == '__main__':
    main()
