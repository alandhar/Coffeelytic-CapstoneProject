from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

db = SQLAlchemy()

def generate_uuid():
    return str(uuid.uuid4())

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    # Relasi: satu user bisa punya banyak produk
    products = db.relationship('Product', backref='user', cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.Text, nullable=False)
    origin = db.Column(db.Text, nullable=False)
    bean_type = db.Column(db.Text, nullable=False)
    post_harvest_method = db.Column(db.Text)
    flavor_profile = db.Column(db.Text)
    acidity_level = db.Column(db.Text)
    bitterness_level = db.Column(db.Text)
    sweetness_level = db.Column(db.Text)
    recommended_brew_method = db.Column(db.Text)
    product_image = db.Column(db.Text)
    weight = db.Column(db.Integer)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
