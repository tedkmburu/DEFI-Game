from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from config import Config
from flask_bootstrap import Bootstrap
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, support_credentials=True)
app.config.from_object(Config)
db = SQLAlchemy(app)
login = LoginManager(app)
login.login_view = 'login'
login.login_message = ""
migrate = Migrate(app, db)
bootstrap = Bootstrap(app)

from backend import routes, models
