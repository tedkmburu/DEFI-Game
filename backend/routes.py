import json
import sys
import flask_login
from flask import render_template, redirect, url_for, flash, request, Flask
from flask_login import login_required, current_user, login_user, logout_user
from werkzeug.urls import url_parse
from flask_cors import CORS

from backend import app, db
from backend.forms import LoginForm, RegistrationForm, NewCourseForm
from backend.models import Teacher, Course, Enrollment, Student, Score

from datetime import date
from operator import itemgetter

"""
Note:
Restructured the backend folder so there is only backend and not both backend and app folder.

Need .flaskenv or do export FLASK_APP=defi_app.py in the terminal before running it

pip install python-dotenv
make a .flaskenv file inside DEFI-Game folder which has FLASK_APP=defi_app.py inside.
"""

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    form = NewCourseForm()
    if form.validate_on_submit():
        flash('Created course {}'.format(form.name.data))
        # Need a TeacherToCourse table since using same course name as other teachers reuses that same info
        # for student and scores, even if they aren't associated with that teacher.
        new_course_info = Course(courseName=form.name.data,
                                 courseCode=form.code.data,
                                 teacher_id=flask_login.current_user.id)

        db.session.add(new_course_info)

        db.session.commit()
        return redirect(url_for('index'))
    return render_template('index.html', form=form)


@app.route('/courses')
def courses():
    course_list = Course.query.filter_by(teacher_id=flask_login.current_user.id).all()
    return render_template('courses.html', courses=course_list)


@app.route('/course/<name>')
def course(name):
    course_info = Course.query.filter_by(courseName=name).first()

    if course_info:
        students_list = []
        enrollment = Enrollment.query.filter_by(course_id=course_info.id).all()
        all_students = Student.query.all()
        scores = Score.query.all()

        # Figure out a way to format time to minute:second:milliseconds
        for e in enrollment:
            for s in all_students:
                for sc in scores:
                    if s.id == e.student_id and s.id == sc.student_id:
                        info = {
                            'username': s.username,
                            'track': sc.track,
                            'score': sc.score,
                            # 'time': sc.timeToComplete
                        }
                        students_list.append(info)

        ranked_students = sorted(students_list, key=itemgetter('score'), reverse=True)
        return render_template('course.html',
                               course_info=course_info,
                               students=ranked_students)

    else:
        return render_template("404.html")


@app.route('/students')
def students():
    course_list = Course.query.filter_by(teacher_id=flask_login.current_user.id).all()
    enrollment = Enrollment.query.all()
    all_students = Student.query.all()
    students_list = []

    for c in course_list:
        for e in enrollment:
            for s in all_students:
                if c.id == e.course_id and s.id == e.student_id:
                    students_list.append(s.username)

    # print(students_list)
    return render_template('students.html', students=students_list)


@app.route('/student/<username>')
def student(username):
    student_info = Student.query.filter_by(username=username).first()
    student_score = Score.query.filter_by(student_id=student_info.id).all()
    scores_list = []

    if student_info:
        for score in student_score:
            if student_info.id == score.student_id:
                info = {
                    'track': score.track,
                    'starsCollected': score.starsCollected,
                    'score': score.score
                }
                scores_list.append(info)

        ranked_student_score = sorted(scores_list, key=itemgetter('score'), reverse=True)
        return render_template('student.html', username=student_info.username, student=ranked_student_score)
    else:
        return render_template("404.html")


@app.route('/leaderboard')
def leaderboard():
    students_list = []
    enrollment = Enrollment.query.all()
    all_students = Student.query.all()
    scores = Score.query.all()

    for e in enrollment:
        for s in all_students:
            for sc in scores:
                if s.id == e.student_id and s.id == sc.student_id:
                    global_info = {
                        'username': s.username,
                        'track': sc.track,
                        'score': sc.score,
                        'course': Course.query.get(e.course_id).courseName
                        # 'time': sc.timeToComplete
                    }
                    students_list.append(global_info)

    ranked_students = sorted(students_list, key=itemgetter('score'), reverse=True)
    print(ranked_students)
    return render_template("leaderboard.html", students=ranked_students)

@app.route('/leaderboardGame')
def leaderboardGame():
    students_list = []
    enrollment = Enrollment.query.all()
    all_students = Student.query.all()
    scores = Score.query.all()


    for e in enrollment:
        for s in all_students:
            for sc in scores:
                if s.id == e.student_id and s.id == sc.student_id:
                    global_info = {
                        'name': s.username,
                        'track': sc.track,
                        'score': sc.score,
                        'class': Course.query.get(e.course_id).courseName,
                        'time': sc.timeToComplete
                    }
                    students_list.append(global_info)


    ranked_students = sorted(students_list, key=itemgetter('score'), reverse=True)
    # jsonString = json.dumps(ranked_students)
    # jsonFile = open("leaderboard2.txt", "w")
    # jsonFile.write(jsonString)
    # jsonFile.close()

    print(ranked_students)
    return render_template("leaderboardGame.html", students=ranked_students)


# {
#     time: data.time, 
#     timestamp: getDate(), 
#     score: data.score, 
#     stars_collected: data.stars, 
#     track: (track.level + 1).toString(), 
#     _id: data.userId}

@app.route('/sendData', methods=['GET', 'POST'])
def sendData():
    studentsId =int(request.args.get('_id'))
    time = request.args.get('time')
    # timestamp = request.args.get('timestamp')
    timestamp = date(2022, 12, 3)
    score = request.args.get('score')
    starsCollected = request.args.get('stars_collected')
    track = request.args.get('track')
    
    score = Score(student_id=studentsId,
                   score=score,
                   track=track,
                   starsCollected=starsCollected,
                   timeToComplete=time,
                   timestamp=timestamp
                   )
    print(score)

    db.session.add(score)
    db.session.commit()

    # sendData?_id=123&time=213&timestamp=213&score=123456&stars_collected=3&track=1
    
    return render_template("sendData.html")

@app.route('/createStudent', methods=['GET', 'POST'])
def createStudent():
    username =request.args.get('username')
    score = Student(username=username)
    db.session.add(score)
    db.session.commit()
    return render_template("createStudent.html")




@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = Teacher.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        teacher = Teacher(firstName=form.first.data, lastName=form.last.data, email=form.email.data)
        teacher.set_password(form.password.data)
        db.session.add(teacher)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        flask_login.login_user(teacher)
        return redirect(url_for('index'))
    return render_template('register.html', title='Register', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/populate_db')
def populate_db():
    # Teachers
    t1 = Teacher(firstName="John", lastName="Doe", email="johndoe@mail.edu")
    t1.set_password("123")

    t2 = Teacher(firstName="Jane", lastName="Doe", email="janedoe@mail.edu")
    t2.set_password("123")

    t3 = Teacher(firstName="Bob", lastName="Smith", email="bsmith@mail.edu")
    t2.set_password("123")

    db.session.add_all([t1, t2, t3])
    db.session.commit()

    # Course
    c1 = Course(courseName="Test Course 101",
                courseCode="AB1779C8",
                teacher_id=t1.id)

    c2 = Course(courseName="Test Course 102",
                courseCode="HG1273C8",
                teacher_id=t1.id)

    c3 = Course(courseName="HS Physics E&M I",
                courseCode="AB1779C8",
                teacher_id=t2.id)

    c4 = Course(courseName="HS Physics E&M II",
                courseCode="HG1273C8",
                teacher_id=t2.id)

    c5 = Course(courseName="College Intro Physics II",
                courseCode="HG1273C8",
                teacher_id=t3.id)

    db.session.add_all([c1, c2, c3, c4, c5])
    db.session.commit()

    # Student
    s1 = Student(username="alanwalker")
    s2 = Student(username="jamie1999")

    s3 = Student(username="vkumar123")
    s4 = Student(username="fred4183")

    s5 = Student(username="test1234")
    s6 = Student(username="teststudent")

    db.session.add_all([s1, s2, s3, s4, s5, s6])
    db.session.commit()

    # Enrollment
    e1 = Enrollment(student_id=s1.id, course_id=c1.id)
    e2 = Enrollment(student_id=s2.id, course_id=c1.id)
    e3 = Enrollment(student_id=s3.id, course_id=c2.id)
    e4 = Enrollment(student_id=s4.id, course_id=c3.id)
    e5 = Enrollment(student_id=s5.id, course_id=c4.id)
    e6 = Enrollment(student_id=s6.id, course_id=c5.id)

    db.session.add_all([e1, e2, e3, e4, e5, e6])
    db.session.commit()

    # Score
    score1 = Score(student_id=s1.id,
                   score=29591,
                   track=1,
                   starsCollected=3,
                   timeToComplete=13650,
                   timestamp=date(2022, 12, 3)
                   )

    score2 = Score(student_id=s2.id,
                   score=30591,
                   track=1,
                   starsCollected=2,
                   timeToComplete=10320,
                   timestamp=date(2022, 12, 3)
                   )

    score3 = Score(student_id=s3.id,
                   score=21091,
                   track=1,
                   starsCollected=2,
                   timeToComplete=18920,
                   timestamp=date(2022, 12, 3)
                   )

    score4 = Score(student_id=s4.id,
                   score=30521,
                   track=1,
                   starsCollected=2,
                   timeToComplete=10620,
                   timestamp=date(2022, 12, 3)
                   )

    score5 = Score(student_id=s5.id,
                   score=28591,
                   track=1,
                   starsCollected=2,
                   timeToComplete=10120,
                   timestamp=date(2022, 12, 3)
                   )

    score6 = Score(student_id=s6.id,
                   score=42962,
                   track=1,
                   starsCollected=2,
                   timeToComplete=9920,
                   timestamp=date(2022, 12, 3)
                   )

    score7 = Score(student_id=s1.id,
                   score=27890,
                   track=2,
                   starsCollected=3,
                   timeToComplete=13630,
                   timestamp=date(2022, 12, 4)
                   )

    db.session.add_all([score1, score2, score3, score4, score5, score6, score7])
    db.session.commit()

    flash("Database has been populated")
    return render_template('courses.html')


@app.route('/reset_db')
def reset_db():
    flash("Resetting database: deleting old data and repopulating with dummy data")
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        print('Clear table {}'.format(table))
        db.session.execute(table.delete())
    db.session.commit()
    return render_template('courses.html')
