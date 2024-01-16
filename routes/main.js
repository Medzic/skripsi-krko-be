const express = require('express');
const {authMiddleware} = require('../middleware/userAuth');
const { 
    createPengajuan, 
    getAllPengajuan, 
    getOnePengajuan, 
    updatePengajuan, 
    deletePengajuan} = require('../handlers/mainHandler');
const { createLokasi } = require('../handlers/lokasiHandler');

const router = express.Router();

router.post('/pengajuan/create', authMiddleware, createPengajuan)
router.get('/pengajuan', authMiddleware, getAllPengajuan)
router.get('/pengajuan/:id', authMiddleware, getOnePengajuan)
router.put('/pengajuan/update/:id', authMiddleware, updatePengajuan)
router.delete('/pengajuan/delete/:id', authMiddleware, deletePengajuan)

//lokasi endpoint
router.post('/lokasi/create', authMiddleware, createLokasi )



module.exports = router