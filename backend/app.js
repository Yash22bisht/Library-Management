const express = require("express");
const pool = require("./db/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const loginRouter = require("./routes/loginRouter");
const bookStudentRouter = require("./routes/bookStudentRouter");
const bookLibRouter = require("./routes/bookLibRotuer");
const bookApproveRouter = require("./routes/bookApproveRouter");
const bookIssueRouter = require("./routes/bookIssueRouter");
const registerStudentRouter = require("./routes/registerStudentRouter");

const { authenticate } = require("./middleware/authenticate");
const {authorize} = require("./middleware/authorize");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/register",registerStudentRouter);
app.use("/api/login", loginRouter);
app.use("/api/books/Student", authenticate, bookStudentRouter);
app.use("/api/books/Librarian", authenticate, authorize(['librarian']), bookLibRouter);
app.use("/api/books/Approve", authenticate, authorize(['librarian']), bookApproveRouter);
app.use("/api/issue", authenticate, bookIssueRouter);




module.exports = { app };
