const express = require("express");
const { requestBook, returnBookRequest, approveBookRequest ,approveReturnRequest ,rejectBookRequest } = require("../controllers/bookIssueCont");

const router = express.Router();

router.post("/requestBook", requestBook);
router.post("/returnBookRequest", returnBookRequest);
router.post("/approveRequest", approveBookRequest);
router.post("/approveReturnRequest", approveReturnRequest);
router.post("/rejectRequest", rejectBookRequest);

module.exports = router;