const express = require("express");
const {getBooksForStudent,getMyBooks} = require("../controllers/bookCont");

const router = express.Router();

router.get("/getBooks", getBooksForStudent);
router.get("/getMyBooks", getMyBooks);

module.exports = router;
