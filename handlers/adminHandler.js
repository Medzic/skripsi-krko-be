const { Pengajuan } = require("../models");

const adminAccHandler = async (req, res) => {
  const { noreg, notes } = req.body;

  const id = req.params.id;

  try {
    const selectedPengajuan = await Pengajuan.findByPk(id);

    selectedPengajuan.noreg = noreg;
    selectedPengajuan.notes = notes;

    await selectedPengajuan.save();
    return res.json(selectedPengajuan);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  adminAccHandler,
};
