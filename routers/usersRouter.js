const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../users-models/users-model.js");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.get("/users/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      sendUserError(500, error, res);
    });
});
module.exports = router;
