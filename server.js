const connectDB = require("./DB/connect");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server started successfully"));
