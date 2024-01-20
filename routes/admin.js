const express = require('express');
const {checkAdmin} = require('../middleware/userAuth');
const { adminAccHandler } = require('../handlers/adminHandler');
const { adminRegisterHandler } = require('../handlers/authHandler');

const router = express.Router();

router.post("/admin/register", checkAdmin, adminRegisterHandler);

router.patch('/admin/pengajuan/:id', checkAdmin ,adminAccHandler)

module.exports = router