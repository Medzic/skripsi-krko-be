const { Lokasi } = require("../models");

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

module.exports = {
  createLokasi,
};
