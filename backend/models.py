from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
            username = db.Column(db.String(100), unique=True, nullable=False)
                password = db.Column(db.String(100), nullable=False)
                    role = db.Column(db.String(50), nullable=False)  # 'admin' or 'company'
                    email = db.Column(db.String(50), nullable=False)

                    class BenchResource(db.Model):
                            id = db.Column(db.Integer, primary_key=True)
                                category = db.Column(db.String(100), nullable=False)
                                first_name = db.Column(db.String(100), nullable=False)
                                last_name = db.Column(db.String(100), nullable=False)
                                booked_by = db.Column(db.String(100), db.ForeignKey('user.username'))
                                booked_company = db.Column(db.String(100))
