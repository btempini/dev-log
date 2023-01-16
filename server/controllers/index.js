const User = require("../models/User");

module.exports = {
  createUser(req, res) {
    User.create(req.body)
    .then();
  },
};
