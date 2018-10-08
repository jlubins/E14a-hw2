# Define Web Form

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, SelectField, DecimalField
from wtforms.validators import DataRequired

class UsersForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    prog_lang = SelectField('Programming Language', choices=[('cpp', 'C++'), ('py', 'Python'), ('java', 'Java'),
                                                             ('php', 'PHP'), ('js', 'JavaScript'), ('other', 'Other')])
    experience_yr = DecimalField('Experience Years', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired()])
    hw1_hrs = DecimalField('Homework 1 Hours', validators=[DataRequired()])
    submit = SubmitField('Enter')