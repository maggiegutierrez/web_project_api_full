const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ForbiddenError } = require("../errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new ForbiddenError("Se requiere autorización"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new ForbiddenError("Se requiere autorización"));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
