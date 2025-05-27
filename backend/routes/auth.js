const authController = require('../controllers/auth');

module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: authController.register
  },
  {
    method: 'POST',
    path: '/login',
    handler: authController.login
  }
];
