from flask import Blueprint, request, jsonify
from database import db, User, generate_uuid
from sqlalchemy.exc import IntegrityError
import re, uuid

auth_bp = Blueprint('auth_bp', __name__)

def generate_username(name):
    # Buat username dari nama + 4 digit UUID unik
    base = re.sub(r'\W+', '', name.lower())
    return f"{base}_{str(uuid.uuid4())[:4]}"

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    username = generate_username(name)
    user = User(
        id=generate_uuid(),
        name=name,
        username=username,
        email=email
    )
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({
            'message': 'User registered successfully',
            'user_id': user.id,
            'username': user.username
        }), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already registered'}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        })
    else:
        return jsonify({'error': 'Invalid email or password'}), 401