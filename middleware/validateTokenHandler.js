const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Error");
      }
      console.log(decode);
      req.user = decode.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("token missing");
    }
  }
};
module.exports = validateToken;
