const express = require('express');
const {
    Login, SignUp
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', SignUp);
router.post('/login', Login);

module.exports = router;
