const express = require("express");
const {getBooks,addBook,editBook,deleteBook} = require("../controllers/bookCont");

const router = express.Router();

router.get("/getBooks", getBooks);
router.post("/addBook", addBook);
router.put("/editBook/:id", editBook);
router.delete("/deleteBook/:id", deleteBook);

module.exports = router;
