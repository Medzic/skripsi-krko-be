const express = require('express');
const {authMiddleware} = require('../middleware/userAuth');
const { 
    createPengajuan, 
    getAllPengajuan, 
    getOnePengajuan, 
    updatePengajuan, 
    deletePengajuan} = require('../handlers/mainHandler');

const router = express.Router();

router.post('/pengnajuan/create', authMiddleware, createPengajuan)
router.get('/pengajuan', authMiddleware, getAllPengajuan)
router.get('/pengajuan/:id', authMiddleware, getOnePengajuan)
router.put('/pengajuan/update/:id', authMiddleware, updatePengajuan)
router.delete('/pengajuan/delete/:id', authMiddleware, deletePengajuan)



module.exports = router