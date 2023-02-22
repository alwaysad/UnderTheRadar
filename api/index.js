const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors=require('cors');
const app = express();
const cookieParser=require('cookie-parser');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes=require('./routes/commentRoutes');
const businessRoutes=require('./routes/businessRoutes');

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

app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/business',businessRoutes);
