const errorHandling = (err, req, res, next) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "invalid id format";
  }

  res.status(statusCode).json({ success: false, message });
};

module.exports = errorHandling;
