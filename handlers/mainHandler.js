const { where } = require("sequelize");
const { Pengajuan } = require("../models");
const { Lokasi } = require('../models');

const createPengajuan = async (req, res) => {
  const {
    tanggal,
    namep1,
    namep2,
    namep3,
    nikp1,
    nikp2,
    telp,
    alamat,
    rt,
    rw,
    kelurahan,
    kecamatan,
    kota,
  } = req.body;

  try {
    //variable untuk menentukan user berdasarkan decoded jwt token
    const userId = req.userId;

    const formattedNikp2 = nikp2 ? nikp2 : null;
    const formattedNamep2 = namep2 ? namep2 : null;
    const formattedNamep3 = namep3 ? namep3 : null;

    const pengajuans = await Pengajuan.create({
      tanggal,
      namep1,
      namep2: formattedNamep2,
      namep3: formattedNamep3,
      nikp1,
      nikp2: formattedNikp2,
      telp,
      alamat,
      rt,
      rw,
      kelurahan,
      kecamatan,
      kota,
      userId,
    });
    return res.json(pengajuans);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllPengajuan = async (req, res) => {
  //variable untuk menentukan user berdasarkan decoded jwt token
  const userId = req.userId;

  try {
    const getPengajuan = await Pengajuan.findAll({
      where: {
        userId: userId,
      },
      include: {all: true},
    });


    return res.json(getPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getOnePengajuan = async (req, res) => {
  // variable untuk menentukan data yang dipilih berdasarkan primary key
  const id = req.params.id;

  try {
    const getOnePengajuan = await Pengajuan.findByPk(id, {
      include: [Lokasi]
    });

    if (!getOnePengajuan)
      return res.status(401).json({ message: "Not Found" });

    return res.json(getOnePengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updatePengajuan = async (req, res) => {
  // variable untuk menentukan data yang dipilih berdasarkan primary key
  const id = req.params.id;
  //variable untuk menentukan user berdasarkan decoded jwt token
  const userId = req.userId;

  const {
    tanggal,
    namep1,
    namep2,
    namep3,
    nikp1,
    nikp2,
    telp,
    alamat,
    rt,
    rw,
    kelurahan,
    kecamatan,
    kota,
  } = req.body;

  const formattedNikp2 = nikp2 ? nikp2 : null;
  const formattedNamep2 = namep2 ? namep2 : null;
  const formattedNamep3 = namep3 ? namep3 : null;

  try {
    const exPengajuan = await Pengajuan.findByPk(id);

    //filter user yang dapat mengakses berdasarkan id user dari decoded token
    if (exPengajuan.userId !== userId)
      return res.status(404).json({ message: "Unauthorized User" });

    exPengajuan.tanggal = tanggal;
    exPengajuan.namep1 = namep1;
    exPengajuan.namep2 = formattedNamep2;
    exPengajuan.namep3 = formattedNamep3;
    exPengajuan.nikp1 = nikp1;
    exPengajuan.nikp2 = formattedNikp2;
    exPengajuan.telp = telp;
    exPengajuan.alamat = alamat;
    exPengajuan.rt = rt;
    exPengajuan.rw = rw;
    exPengajuan.kelurahan = kelurahan;
    exPengajuan.kecamatan = kecamatan;
    exPengajuan.kota = kota;

    await exPengajuan.save();
    return res.json(exPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deletePengajuan = async (req, res) => {
  // variable untuk menentukan data yang dipilih berdasarkan primary key
  const id = req.params.id;
  //variable untuk menentukan user berdasarkan decoded jwt token
  const userId = req.userId;
  try {
    const delPengajuan = await Pengajuan.findByPk(id);

    //filter user yang dapat mengakses berdasarkan id user dari decoded token
    if (delPengajuan.userId !== userId)
      return res.status(404).json({ message: "Unauthorized User" });

    await delPengajuan.destroy();

    return res.json({ message: "berhasil dihapus" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const pengajuanReconfirm = async (req, res) => {
  const { notes } = req.body;

  const userId = req.userId;

  const id = req.params.id;

  try {
    const selectedPengajuan = await Pengajuan.findByPk(id);

    if (selectedPengajuan.userId !== userId)
      return res.status(404).json({ message: "Unauthorized User" });

    selectedPengajuan.notes = notes;

    await selectedPengajuan.save();
    return res.json(selectedPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
const pengajuanArsip = async (req, res) => {
  const { arsip } = req.body;


  const id = req.params.id;

  try {
    const selectedPengajuan = await Pengajuan.findByPk(id);

    if (!selectedPengajuan)
      return res.status(404).json({ message: "Not Found" });

    selectedPengajuan.arsip = arsip;

    await selectedPengajuan.save();
    return res.json(selectedPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
const pengajuanPicked = async (req, res) => {
  const { picked } = req.body;

  const id = req.params.id;

  try {
    const selectedPengajuan = await Pengajuan.findByPk(id);

    if (!selectedPengajuan)
      return res.status(404).json({ message: "Not Found" });

    selectedPengajuan.picked = picked;

    await selectedPengajuan.save();
    return res.json(selectedPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

module.exports = {
  createPengajuan,
  getAllPengajuan,
  getOnePengajuan,
  updatePengajuan,
  deletePengajuan,
  pengajuanReconfirm,
  pengajuanArsip,
  pengajuanPicked,
};
