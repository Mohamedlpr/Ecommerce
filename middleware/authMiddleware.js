const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.tokenVerification = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : null;

    if (!token) {
      res.status(401);
      throw new Error("invalid or expired token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401);
    next(new Error("invalid or expired token"));
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      res.status(403);
      throw new Error("admin access only");
    }
    next();
  } catch (err) {
    next(err);
  }
};
