from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login


class Teachers(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(32))
    lastName = db.Column(db.String(32))
    email = db.Column(db.String(128))
    password_hash = db.Column(db.String(32))
    courses = db.relationship('Courses', backref='courses', lazy='dynamic')  # A venue can have many events

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# @login.user_loader
# def load_user(id):
#     return User.query.get(int(id))


class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    randId = db.Column(db.String(32))
    username = db.Column(db.String(32))
    classId = db.Column(db.Integer, db.ForeignKey('user.id'))
    course = db.Column(db.String(32))
    scores = db.relationship('Scores', backref='scores', lazy='dynamic')  # A venue can have many events



class Scores(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentId = db.Column(db.Integer) 
    score = db.Column(db.Integer) 
    track = db.Column(db.Integer) 
    starsCollected = db.Column(db.Integer) 
    timeToComplete = db.Column(db.Integer) 
    timestamp = db.Column(db.Date) 
    score = db.Column(db.Integer) 


class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    courseId = db.Column(db.String(32)) 
    courseName = db.Column(db.String(32)) 














class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(32))
    event_date = db.Column(db.Date)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'))
    def __repr__(self):
        return '<Event {}>'.format(self.eventName)