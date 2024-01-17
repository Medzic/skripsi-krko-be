const { Lokasi } = require("../models");
const { Pengajuan } = require("../models");

const createLokasi = async (req, res) => {
  try {
    const {
      pengajuanId,
      loktanah,
      rt,
      rw,
      kelurahan,
      kecamatan,
      keperluan,
      stanah,
      nocert,
      luas,
      atasnama,
    } = req.body;

    const lokasi = await Lokasi.create({
      pengajuanId,
      loktanah,
      rt,
      rw,
      kelurahan,
      kecamatan,
      keperluan,
      stanah,
      nocert,
      luas,
      atasnama,
    });
    return res.json(lokasi);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getLokasi = async (req, res) => {
  const id = req.params.id;

  const userId = req.userId;

  try {
    const getOneLokasi = await Lokasi.findByPk(id);

    const getOnePengajuan = await Pengajuan.findByPk(getOneLokasi.pengajuanId);

    if (getOnePengajuan.userId !== userId)
      return res.status(401).json({ message: "Unauthorized User" });

    return res.json(getOneLokasi);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updateLokasi = async (req, res) => {
  const id = req.params.id;

  const {
    pengajuanId,
    loktanah,
    rt,
    rw,
    kelurahan,
    kecamatan,
    keperluan,
    stanah,
    nocert,
    luas,
    atasnama,
  } = req.body;

  try {
    const exLokasi = await Lokasi.findByPk(id);

    exLokasi.pengajuanId = pengajuanId;
    exLokasi.loktanah = loktanah;
    exLokasi.rt = rt;
    exLokasi.rw = rw;
    exLokasi.kelurahan = kelurahan;
    exLokasi.kecamatan = kecamatan;
    exLokasi.keperluan = keperluan;
    exLokasi.stanah = stanah;
    exLokasi.nocert = nocert;
    exLokasi.luas = luas;
    exLokasi.atasnama = atasnama;

    await exLokasi.save();
    return res.json(exLokasi);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleteLokasi = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    const getLokasi = await Lokasi.findByPk(id);

    const getPengajuan = await Pengajuan.findByPk(getLokasi.pengajuanId);

    if (getPengajuan.userId !== userId)
      return res.status(401).json({ message: "Unautorized User" });

    await getLokasi.destroy();
    
    return res.json({message: "Lokasi berhasil Dihapus"})
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  createLokasi,
  updateLokasi,
  getLokasi,
  deleteLokasi
};
