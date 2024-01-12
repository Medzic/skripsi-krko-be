const express = require('express');
const {checkAdmin} = require('../middleware/userAuth');

const router = express.Router();

router.use(checkAdmin);

router.get('/adminDashboard', (req,res) =>{
    res.send('hello world')
})

module.exports = router