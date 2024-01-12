const express = require('express');
const {authMiddleware} = require('../middleware/userAuth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req,res) =>{
    res.send('hello world')
})

module.exports = router