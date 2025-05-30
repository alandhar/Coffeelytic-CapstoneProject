from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from database import db, Product, User
import os
import uuid

product_bp = Blueprint('product_bp', __name__)

@product_bp.route('/products', methods=['POST'])
def add_product():
    data = request.form
    image_file = request.files.get('product_image')

    # Validasi field wajib
    required_fields = [
        'user_id', 'name', 'origin', 'bean_type', 'post_harvest_method',
        'flavor_profile', 'acidity_level', 'bitterness_level',
        'sweetness_level', 'recommended_brew_method', 'weight', 'price'
    ]
    missing = [field for field in required_fields if not data.get(field)]
    if missing or not image_file:
        return jsonify({"error": f"Fields required: {', '.join(missing + (['product_image'] if not image_file else []))}"}), 400

    # Validasi user_id
    user = User.query.filter_by(id=data['user_id']).first()
    if not user:
        return jsonify({"error": "Invalid user_id"}), 400

    # Simpan gambar
    filename = secure_filename(image_file.filename)
    image_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    image_file.save(image_path)

    # Simpan ke DB
    try:
        product = Product(
            id=str(uuid.uuid4()),
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
            product_image=filename,
            weight=int(data['weight']),
            price=int(data['price'])
        )
        db.session.add(product)
        db.session.commit()
        return jsonify({"message": "Product created", "id": product.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
