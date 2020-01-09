require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO use Express middleware to create cookies (JWT)
// TODO use Express middleware to populate current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, details => {
  console.log(`Server is running on port http://localhost:${details.port}`);
});