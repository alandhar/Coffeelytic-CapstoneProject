from flask import Blueprint, request, jsonify
from database import db, Product, User
import uuid

product_bp = Blueprint('product_bp', __name__)
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json
    if not data.get('name') or not data.get('email'):
        return jsonify({"error": "Name and email are required"}), 400

    new_user = User(
        id=str(uuid.uuid4()),
        name=data['name'],
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created", "id": new_user.id}), 201

@product_bp.route('/products', methods=['POST'])
def add_product():
    data = request.json

    required_fields = [
        'user_id', 'name', 'origin', 'bean_type', 'post_harvest_method',
        'flavor_profile', 'acidity_level', 'bitterness_level',
        'sweetness_level', 'recommended_brew_method', 'product_image',
        'weight', 'price'
    ]

    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return jsonify({"error": f"Fields required and cannot be empty: {', '.join(missing)}"}), 400

    try:
        product = Product(
            user_id=data['user_id'],
            name=data['name'],
            origin=data['origin'],
            bean_type=data['bean_type'],
            post_harvest_method=data['post_harvest_method'],
            flavor_profile=data['flavor_profile'],
            acidity_level=data['acidity_level'],
            bitterness_level=data['bitterness_level'],
            sweetness_level=data['sweetness_level'],
            recommended_brew_method=data['recommended_brew_method'],
            product_image=data['product_image'],
            weight=data['weight'],
            price=data['price']
        )
        db.session.add(product)
        db.session.commit()
        return jsonify({"message": "Product created", "id": product.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400