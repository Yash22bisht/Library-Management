const express = require("express");
const {approveBookRequest ,approveReturnRequest ,rejectBookRequest } = require("../controllers/bookIssueCont");

const router = express.Router();

router.post("/approveRequest", approveBookRequest);
router.post("/approveReturnRequest", approveReturnRequest);
router.post("/rejectRequest", rejectBookRequest);

module.exports = router;