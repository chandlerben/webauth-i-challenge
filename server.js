const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");
const authenticationRouter = require("./routers/authenticationRouter");
const usersRouter = require("./routers/usersRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.use(
  "/api",
  loginRouter,
  registerRouter,
  authenticationRouter,
  usersRouter
);

module.exports = server;
