const express = require("express");
const {getBooks,getMyBooks} = require("../controllers/bookCont");

const router = express.Router();

router.get("/getBooks", getBooks);
router.get("/getMyBooks", getMyBooks);

module.exports = router;
