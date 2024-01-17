const express = require('express');
const {authMiddleware} = require('../middleware/userAuth');
const { 
    createPengajuan, 
    getAllPengajuan, 
    getOnePengajuan, 
    updatePengajuan, 
    deletePengajuan} = require('../handlers/mainHandler');
const { 
    createLokasi,
    updateLokasi, 
    getLokasi,
    deleteLokasi} = require('../handlers/lokasiHandler');

const router = express.Router();

router.post('/pengajuan/create', authMiddleware, createPengajuan)
router.get('/pengajuan', authMiddleware, getAllPengajuan)
router.get('/pengajuan/:id', authMiddleware, getOnePengajuan)
router.put('/pengajuan/edit/:id', authMiddleware, updatePengajuan)
router.delete('/pengajuan/delete/:id', authMiddleware, deletePengajuan)

//lokasi endpoint
router.post('/lokasi/create', authMiddleware, createLokasi)
router.get('/lokasi/:id', authMiddleware, getLokasi)
router.put('/lokasi/edit/:id', authMiddleware, updateLokasi)
router.delete('/lokasi/delete/:id', authMiddleware, deleteLokasi)

//dokumen endpoint




module.exports = router