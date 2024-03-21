const express = require("express");
const { authMiddleware } = require("../middleware/userAuth");
const {
  createPengajuan,
  getAllPengajuan,
  getOnePengajuan,
  updatePengajuan,
  deletePengajuan,
} = require("../handlers/mainHandler");
const {
  createLokasi,
  updateLokasi,
  getLokasi,
  deleteLokasi,
  getOneLokasi,
} = require("../handlers/lokasiHandler");
const {
  uploadHandler,
  getAllFileHandler,
  editFileHandler,
  deleteFileHandler,
} = require("../handlers/fileHandler");

const router = express.Router();

//pengajuan endpoint
router.post("/pengajuan/create", authMiddleware, createPengajuan);
router.get("/pengajuan", authMiddleware, getAllPengajuan);
router.get("/pengajuan/:id", authMiddleware, getOnePengajuan);
router.put("/pengajuan/edit/:id", authMiddleware, updatePengajuan);
router.delete("/pengajuan/delete/:id", authMiddleware, deletePengajuan);

//lokasi endpoint
router.post("/lokasi/create", authMiddleware, createLokasi);
router.get("/lokasi", authMiddleware, getLokasi);
router.get("/lokasi/:id", authMiddleware, getOneLokasi);
router.put("/lokasi/edit/:id", authMiddleware, updateLokasi);
router.delete("/lokasi/delete/:id", authMiddleware, deleteLokasi);

//dokumen endpoint
router.post("/dokumen/upload", authMiddleware, uploadHandler);
router.get("/dokumen/:id", authMiddleware, getAllFileHandler);
router.put("/dokumen/edit/:id", authMiddleware, editFileHandler);
router.delete("/dokumen/:id", authMiddleware, deleteFileHandler);

module.exports = router;
