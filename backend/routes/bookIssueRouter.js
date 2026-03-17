const express = require("express");
const { requestBook, returnBookRequest } = require("../controllers/bookIssueCont");

const router = express.Router();

router.post("/requestBook", requestBook);
router.post("/returnBookRequest", returnBookRequest);

module.exports = router;