const { Pengajuan } = require("../models");
const { User } = require("../models");
const { Filestorage } = require("../models");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "keyfilepdf.json" });
const bucket = storage.bucket("pdf_bucket_01");

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

const getAccPengajuan = async (req, res) => {
  const role = req.role
  try {
    const getAllUser = await User.findAll({
      include: {all: true, nested: true}
    })

    if(!getAllUser) return res.status(404).json({message: 'Data Tidak Ditemukan'});

    return res.json(getAllUser)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

const getOneAccPengajuan = async (req, res) => {
  const pid = req.params.id
  try {
    const getOneAccPengajuan = await Pengajuan.findByPk(pid,{
      include: { all : true}
    })

    if(!getOneAccPengajuan) return res.status(404).json({message: 'Data Tidak Ditemukan'});

    return res.json(getOneAccPengajuan)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

const getSpecFile = async (req, res) => {
  const pid = req.params.id;

  try {
    const getFileDb = await Filestorage.findAll({
      where: {
        pengajuanId: pid
      }
    });


    if (getFileDb.length === 0) {
      return res.status(404).json({ message: "data file tidak ditemukan" })
    }

    const filenames = getFileDb.flatMap(storage => storage.filename);

    //get all from cloud
    const [storageFiles] = await bucket.getFiles();


    // filter data banyak dari cloud storage
    const filterStorageFiles = storageFiles.filter((file) =>
      filenames.flat().includes(file.name)
    );


    if (filterStorageFiles.length === 0) {
      return res.status(404).json({ message: "No matching files found." });
    }

    const fileInfos = filterStorageFiles.map((file, index) => ({
      id: getFileDb[index].id,
      name: file.name,
      url: file.metadata.mediaLink,
    }));

    return res.status(200).json(fileInfos);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  adminAccHandler,
  getOneAccPengajuan,
  getAccPengajuan,
  getSpecFile
};
