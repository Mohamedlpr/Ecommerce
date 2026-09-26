const connectDB = require("./DB/connect");
const errorHandling = require("./middleware/centralizedMiddleware");
const express = require("express");
const app = express();
require("dotenv").config();

connectDB();

app.use(errorHandling);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server started successfully"));
