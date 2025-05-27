const users = []; // penyimpanan sementara

exports.register = (request, h) => {
  const { email, password } = request.payload;

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return h.response({ message: "Email sudah terdaftar." }).code(400);
  }

  const newUser = { email, password }; // belum ada enkripsi
  users.push(newUser);

  return h.response({ message: "Registrasi berhasil." }).code(201);
};

exports.login = (request, h) => {
  const { email, password } = request.payload;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return h.response({ message: "Email atau password salah." }).code(401);
  }

  return h.response({ message: "Login berhasil." }).code(200);
};
