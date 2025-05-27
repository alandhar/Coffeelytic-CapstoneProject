const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const init = async () => {
  const server = Hapi.server({ port: 3000, host: 'localhost' });

  await server.register(Inert);
  server.route([...productRoutes, ...userRoutes]);

  server.route({
    method: 'GET',
    path: '/uploads/{file*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'uploads'),
        listing: false
      }
    }
  });

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

init();
