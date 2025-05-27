const db = require('../db/db');

module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: async (request, h) => {
      const { email, password, role } = request.payload;

      const check = await db.query(`SELECT * FROM "user" WHERE email = $1`, [email]);
      if (check.rows.length > 0) {
        return h.response({ message: 'User sudah terdaftar' }).code(400);
      }

      const insert = await db.query(`
        INSERT INTO "user" (email, password, role)
        VALUES ($1, $2, $3)
        RETURNING id, email, role
      `, [email, password, role]);

      return h.response({ message: 'Registrasi berhasil', user: insert.rows[0] }).code(201);
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
      const { email, password } = request.payload;

      const query = await db.query(`SELECT * FROM "user" WHERE email = $1 AND password = $2`, [email, password]);
      if (query.rows.length === 0) {
        return h.response({ message: 'Email atau password salah' }).code(401);
      }

      return h.response({
        message: 'Login berhasil',
        user: {
          id: query.rows[0].id,
          email: query.rows[0].email,
          role: query.rows[0].role
        }
      }).code(200);
    }
  }
];
