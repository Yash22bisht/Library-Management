const express = require("express");
const { registerStudent } = require("../controllers/registerStudentCont");

const router = express.Router();

router.post("/student", registerStudent);

module.exports = router;