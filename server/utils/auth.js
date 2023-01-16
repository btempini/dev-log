const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
//secret bytes
const secret = process.env.SECRET;
//session lasts two hours
const expiration = "2h";

module.exports = {
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
