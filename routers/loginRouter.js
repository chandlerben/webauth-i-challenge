const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../users-models/users-model.js");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.post("/login/", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        sendUserError(401, "You shall not pass", res);
      }
    })
    .catch(error => {
      sendUserError(500, error, res);
    });
});

module.exports = router;
