import flask_login
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, DateField, PasswordField, BooleanField, SelectField, \
    SelectMultipleField
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo, Length

from backend import models
from backend.models import Course, Teacher


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Log In')


class RegistrationForm(FlaskForm):
    first = StringField('First', validators=[DataRequired()])
    last = StringField('Last', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_email(self, email):
        user = Teacher.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('That email is already registered, please choose a different email.')


class NewCourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired()])
    code = StringField('Course Code', validators=[DataRequired(), Length(min=7)])
    submit = SubmitField('Create Course')

    def validate_name(self, name):
        temp = Course.query.filter_by(teacher_id=flask_login.current_user.id).all()
        names_list = []

        for i in temp:
            names_list.append(i.courseName)

        if name.data in names_list:
            raise ValidationError('You have already created a course with that name.')


    def validate_code(self, code):
        courseCode = Course.query.filter_by(courseCode=code.data).first()

        if courseCode is not None:
            raise ValidationError('The course code is already taken')
