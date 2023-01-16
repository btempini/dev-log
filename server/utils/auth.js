const jwt = require("jsonwebtoken");

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    return req;
  },
  signToken: function ({ email, username, _id }) {
    //secret bytes
    const secret = process.env.PASS;
    //session lasts two hours
    const expiration = "2h";
    const payload = { email, username, _id };
    console.log(secret);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
