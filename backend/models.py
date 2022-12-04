from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from backend import db, login


class Teacher(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(32))
    lastName = db.Column(db.String(32))
    email = db.Column(db.String(128))
    password_hash = db.Column(db.String(32))
    courses = db.relationship('Course', backref='courses', lazy='dynamic')  # A teacher can have many courses

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


@login.user_loader
def load_user(teacher_id):
    return Teacher.query.get(int(teacher_id))


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    courseName = db.Column(db.String(32))
    courseCode = db.Column(db.String(32))  # A class-code will have letters & numbers
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'))


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32))
    scores = db.relationship('Score', backref='scores', lazy='dynamic')  # A student can have many scores


class Enrollment(db.Model):  # StudentToCourse (many-to-many relationship)
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))


class Score(db.Model): # Need to store data from js game data to here
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    score = db.Column(db.Integer)
    track = db.Column(db.Integer)
    starsCollected = db.Column(db.Integer)
    timeToComplete = db.Column(db.Integer)
    timestamp = db.Column(db.Date)
