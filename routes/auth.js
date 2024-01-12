const express = require('express');
const { registerHandler, loginHandler, adminLoginHandler } = require('../handlers/authHandler');
const router = express.Router();


router.post('/register', registerHandler)

router.post('/login', loginHandler)

router.post('/admin', adminLoginHandler)

module.exports = router