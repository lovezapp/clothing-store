const cookieParser = require("cookie-parser");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// use Express middleware to create cookies (JWT)
/* Accept the request and parse any cookies that came along with it
  so we can parse the JWT and authenticate Users. cookieParser
  means we get it in a nice object instead of just a string */
server.express.use(cookieParser());

// TODO use Express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  details => {
    console.log(`Server is running on port http://localhost:${details.port}`);
  }
);
