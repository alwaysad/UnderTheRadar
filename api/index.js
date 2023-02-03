const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database start");
    app.listen("8800", () => {
      console.log("listening to port");
    });
  }
);

//middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
