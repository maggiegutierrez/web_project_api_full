const { isCelebrateError } = require("celebrate");

const centralizedErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    return res
      .status(400)
      .json({ message: "Los datos enviados no son válidos" });
  }

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res
      .status(400)
      .json({ message: "Los datos enviados no son válidos" });
  }

  if (err.code === 11000) {
    return res
      .status(409)
      .json({ message: "Usuario anteriormente registrado" });
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).json({
    message:
      statusCode === 500 ? "En el servidor se produjo un error" : message,
  });
};

module.exports = centralizedErrorHandler;
