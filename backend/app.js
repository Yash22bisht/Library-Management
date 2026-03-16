const express = require("express");
const pool = require("./db/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./routes/loginRouter");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/login", loginRouter);




module.exports = { app };
