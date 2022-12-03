from backend import app
"""
Note:
Restructured the backend folder so there is only backend and not both backend and app folder.

Need .flaskenv or do export FLASK_APP=defi_app.py in the terminal before running it

pip install python-dotenv
make a .flaskenv file inside DEFI-Game folder which has FLASK_APP=defi_app.py inside.
"""
@app.route('/')
@app.route('/index')
def index():
    return "<h1>DEFI Teacher Portal Homepage<h1>"

@app.route('/students')
def students():
    return "<h1>Students page<h1>"

@app.route('/student/<username>')
def student(username):
    pass


@app.route('/leaderboard')
def leaderboard():
    return "<h1>Leaderboard<h1>"

@app.route('/login')
def login():
    return "<h1>Login Page<h1>"

