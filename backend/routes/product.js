const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/db');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })
});

const routes = [
  {
    method: 'GET',
    path: '/product',
    handler: async (request, h) => {
      const { seller_id, page = 1, limit = 8 } = request.query;
      const offset = (page - 1) * limit;

      try {
        const query = seller_id
          ? `SELECT * FROM product WHERE seller_id = $1 ORDER BY id DESC LIMIT $2 OFFSET $3`
          : `SELECT * FROM product ORDER BY id DESC LIMIT $1 OFFSET $2`;

        const params = seller_id
          ? [seller_id, limit, offset]
          : [limit, offset];

        const result = await db.query(query, params);
        return h.response(result.rows);
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal ambil produk' }).code(500);
      }
    }
  },
  {
    method: 'GET',
    path: '/product/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return h.response({ error: 'Produk tidak ditemukan' }).code(404);
      }
      return h.response(result.rows[0]);
    }
  },
  {
    method: 'POST',
    path: '/product-upload',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        maxBytes: 10 * 1024 * 1024
      },
      pre: [
        {
          method: (request, h) => {
            return new Promise((resolve, reject) => {
              upload.single('image')(request.raw.req, request.raw.res, (err) => {
                if (err) return reject(err);
                resolve(h.continue);
              });
            });
          }
        }
      ]
    },
    handler: async (request, h) => {
      const { name, brand, taste_note, origin, weight, price, seller_id } = request.payload;
      const file = request.raw.req.file;
      const image_url = file ? `http://localhost:3000/uploads/${file.filename}` : null;

      try {
        await db.query(`
          INSERT INTO product (name, brand, taste_note, origin, weight, price, seller_id, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [name, brand, taste_note, origin, weight, price, seller_id, image_url]);

        return h.response({ message: 'Produk berhasil ditambahkan' }).code(201);
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal upload' }).code(500);
      }
    }
  },
  {
    method: 'PUT',
    path: '/product/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      const { name, brand, taste_note, origin, weight, price } = request.payload;
      try {
        await db.query(`
          UPDATE product SET
            name = $1,
            brand = $2,
            taste_note = $3,
            origin = $4,
            weight = $5,
            price = $6
          WHERE id = $7
        `, [name, brand, taste_note, origin, weight, price, id]);
        return h.response({ message: 'Produk berhasil diperbarui' });
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal memperbarui produk' }).code(500);
      }
    }
  },
  {
    method: 'DELETE',
    path: '/product/{id}',
    handler: async (request, h) => {
      const { id } = request.params;
      try {
        await db.query('DELETE FROM product WHERE id = $1', [id]);
        return h.response({ message: 'Produk berhasil dihapus' });
      } catch (err) {
        console.error(err);
        return h.response({ error: 'Gagal menghapus produk' }).code(500);
      }
    }
  }
];

module.exports = routes;