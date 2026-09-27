const connectDB = require("./DB/connect");
const errorHandling = require("./middleware/centralizedMiddleware");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
connectDB();

app.use("/api/auth", authLimiter, require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use(errorHandling);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server started successfully"));
