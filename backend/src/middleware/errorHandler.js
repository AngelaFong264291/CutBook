function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error.";

  // Keep production responses clean while still exposing helpful detail in development.
  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
  });
}

module.exports = errorHandler;
