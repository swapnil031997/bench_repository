from flask import Blueprint, request, jsonify, current_app
from .models import db, bcrypt, User
import jwt
import datetime

auth = Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login():
        data = request.get_json()
            username = data.get('username')
                password = data.get('password')

                    user = User.query.filter_by(username=username).first()

                        if user and bcrypt.check_password_hash(user.password, password):
                                    token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                                                                                  current_app.config['SECRET_KEY'])
                                            return jsonify({'token': token.decode('UTF-8')}), 200
                                            else:
                                                        return jsonify({'message': 'Invalid credentials'}), 401

