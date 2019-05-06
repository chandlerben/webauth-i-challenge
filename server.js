const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");
const authenticationRouter = require("./routers/authenticationRouter");
const usersRouter = require("./routers/usersRouter");
const Users = require("./users-models/users-model.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("It's alive!");
});

server.use(
  "/api/",
  loginRouter,
  registerRouter,
  authenticationMiddleware,
  usersRouter
);

function authenticationMiddleware(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: `You shall not pass!` });
        }
      })
      .catch(error => {
        sendUserError(500, error, res);
      });
  } else {
    res.status(400).json({ message: "You shall not pass!" });
  }
}

module.exports = server;
