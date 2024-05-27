const express = require('express');
const { checkAdmin } = require('../middleware/userAuth');
const { adminAccHandler, getAccPengajuan, getSpecFile, getOneAccPengajuan, getJustPengajuan } = require('../handlers/adminHandler');
const { adminRegisterHandler } = require('../handlers/authHandler');

const router = express.Router();

router.post("/admin/register", checkAdmin, adminRegisterHandler);

router.patch('/admin/pengajuan/:id', checkAdmin, adminAccHandler);

router.get("/admin/getaccpengajuan", checkAdmin, getAccPengajuan);

router.get("/admin/getalljustpengajuan", checkAdmin, getJustPengajuan);

router.get("/admin/getoneaccpengajuan/:id", checkAdmin, getOneAccPengajuan);

router.get("/admin/allspecfile/:id", checkAdmin, getSpecFile)

module.exports = router