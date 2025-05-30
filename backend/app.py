from flask import Flask
from config import Config
from database import db
from routes.product import product_bp
from routes.auth import auth_bp
from flask_cors import CORS
import os

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db.init_app(app)
app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)