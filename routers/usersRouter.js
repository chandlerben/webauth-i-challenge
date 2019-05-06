const express = require("express");

const router = express.Router();

const sendUserError = (status, message, res) => {
  res.status(status).json({ errorMessage: message });
  return;
};

router.get("/", (req, res) => {});

module.exports = router;
