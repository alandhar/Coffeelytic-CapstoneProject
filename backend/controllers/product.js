const db = require('../db/db');

exports.addProduct = async (request, h) => {
  const { name, brand, taste_note, origin, weight, price } = request.payload;
  try {
    await db.query(
      `INSERT INTO product(name, brand, taste_note, origin, weight, price, seller_id)
       VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [name, brand, taste_note, origin, weight, price, 1] // seller_id dummy sementara
    );
    return h.response({ message: 'Product added' }).code(201);
  } catch (err) {
    console.error(err);
    return h.response({ error: 'DB Error' }).code(500);
  }
};
