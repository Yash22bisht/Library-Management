const express = require('express');
const {studentLogin,librarianLogin} = require('../controllers/loginCont');

const router = express.Router();

router.post('/student', studentLogin);
router.post('/librarian', librarianLogin);

module.exports = router;