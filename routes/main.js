const express = require("express");
const { authMiddleware } = require("../middleware/userAuth");
const {
  createPengajuan,
  getAllPengajuan,
  getOnePengajuan,
  updatePengajuan,
  deletePengajuan,
  pengajuanReconfirm,
  pengajuanArsip,
} = require("../handlers/mainHandler");
const {
  createLokasi,
  updateLokasi,
  getLokasi,
  deleteLokasi,
  getOneLokasi,
  deleteLokasiPengajuan,
} = require("../handlers/lokasiHandler");
const {
  uploadHandler,
  getAllFileHandler,
  editFileHandler,
  deleteFileHandler,
  getFileHandler,
  deleteAllFileHandler,
} = require("../handlers/fileHandler");
const { getUser, updateUser, updatePassword } = require("../handlers/userHandler");

const router = express.Router();

//pengajuan endpoint
router.post("/pengajuan/create", authMiddleware, createPengajuan);
router.get("/pengajuan", authMiddleware, getAllPengajuan);
router.get("/pengajuan/:id", authMiddleware, getOnePengajuan);
router.put("/pengajuan/edit/:id", authMiddleware, updatePengajuan);
router.patch("/pengajuan/reconfirm/:id", authMiddleware, pengajuanReconfirm);
router.patch("/pengajuan/arsip/:id", authMiddleware, pengajuanArsip);
router.delete("/pengajuan/delete/:id", authMiddleware, deletePengajuan);

//lokasi endpoint
router.post("/lokasi/create", authMiddleware, createLokasi);
router.get("/lokasi", authMiddleware, getLokasi);
router.get("/lokasi/:id", authMiddleware, getOneLokasi);
router.put("/lokasi/edit/:id", authMiddleware, updateLokasi);
router.delete("/lokasi/delete/:id", authMiddleware, deleteLokasi);
router.delete("/lokasi/deletepengajuan/:id", authMiddleware, deleteLokasiPengajuan);

//dokumen endpoint
router.post("/dokumen/upload", authMiddleware, uploadHandler);
router.get("/dokumen", authMiddleware, getAllFileHandler);
router.get("/dokumen/:id", authMiddleware, getFileHandler);
router.put("/dokumen/edit/:id", authMiddleware, editFileHandler);
router.delete("/dokumen/delete/:id", authMiddleware, deleteFileHandler);
router.delete("/dokumen/alldelete/:id", authMiddleware, deleteAllFileHandler);

// user endpoint
router.get("/getUser", authMiddleware, getUser);
router.put("/updateUser", authMiddleware,updateUser);
router.put("/updatePassword", authMiddleware, updatePassword)

module.exports = router;
