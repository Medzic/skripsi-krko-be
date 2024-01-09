const express = require('express');
const { registerHandler } = require('../handlers/authHandler');
const router = express.Router();


router.post('/users', registerHandler)


module.exports = router