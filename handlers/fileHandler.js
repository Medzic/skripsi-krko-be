const { Filestorage } = require("../models");
const { Pengajuan } = require("../models");
const processFile = require("../middleware/upload");
const { format } = require("util");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({ keyFilename: "keyfilepdf.json" });
const bucket = storage.bucket("pdf_bucket_01");

const uploadHandler = async (req, res) => {
  try {
    await processFile(req, res);

    const pengajuanId = req.body.id;
    if (!pengajuanId) {
      return res
        .status(400)
        .send({ message: "pilih pengajuan untuk file terlebih dahulu" });
    }

    if (!req.file) {
      return res.status(400).send({ message: "tolong upload file" });
    }

    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      req.file.originalname;

    //masukkan structured data kedalam database terlebih dahulu
    await Filestorage.create({
      filename: uniqueSuffix,
      pengajuanId: pengajuanId,
    });

    const blob = bucket.file(uniqueSuffix);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    //proses writig data objek kedalam storage
    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await bucket.file(uniqueSuffix).makePublic();
        return res.json({ message: "file berhasil di upload" });
      } catch {
        return res.status(500).send({
          message: `upload file gagal ${uniqueSuffix}`,
          url: publicUrl,
        });
      }
    });
    blobStream.end(req.file.buffer);
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).json({
        message: "file melebihi 2MB",
      });
    }

    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllFileHandler = async (req, res) => {
  const pengajuanId = req.params.id;

  try {
    const getFileDb = await Filestorage.findAll({
      where: {
        pengajuanId: pengajuanId,
      },
    });

    const dbData = getFileDb.map((file) => file.filename);

    const [storageFiles] = await bucket.getFiles();

    const filterStorageFiles = storageFiles.filter((file) =>
      dbData.includes(file.name)
    );

    if (filterStorageFiles.length === 0) {
      // Handle the case where no matching files are found
      return res.status(404).json({ message: "No matching files found." });
    }

    const fileInfos = filterStorageFiles.map((file) => ({
      name: file.name,
      url: file.metadata.mediaLink,
    }));

    return res.status(200).json(fileInfos);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const editFileHandler = async (req, res) => {
  try {
    const fileId = req.params.id;

    await processFile(req, res);

    const pengajuanId = req.body.id;
    if (!pengajuanId) {
      return res
        .status(400)
        .send({ message: "pilih pengajuan untuk file terlebih dahulu" });
    }

    if (!req.file) {
      return res.status(400).send({ message: "tolong upload file" });
    }

    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      req.file.originalname;

    //cari file yang mau di update di dalam db
    const exFile = await Filestorage.findByPk(fileId);
    if (!exFile) {
      return res
        .status(400)
        .send({ message: "file tidak ditemukan didatabase" });
    }

    //ingat!! selalu destructuring data terleih dahulu sebelum menggunakannya
    const { filename } = exFile;

    //file di cloud dihapus dulu cuy biar tidak dupe
    await bucket.file(filename).delete();

    //inisisasi upload file ke cloud lg
    const blob = bucket.file(uniqueSuffix);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    //proses writig data objek kedalam storage
    blobStream.on("finish", async (data) => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        await blob.makePublic();

        exFile.pengajuanId = pengajuanId;
        exFile.filename = uniqueSuffix;
        await exFile.save();

        return res.json({ message: "file berhasil di upload" });
      } catch {
        return res.status(500).send({
          message: `upload file gagal ${uniqueSuffix}`,
          url: publicUrl,
        });
      }
    });
    blobStream.end(req.file.buffer);
    console.log("berhasil disimpan ke database");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deleteFileHandler = async (req, res) => {
  try {
    const fileId = req.params.id;

    const exFile = await Filestorage.findByPk(fileId);

    if (!exFile) {
      return res.status(404).json({ message: "File not found" });
    }

    const { filename } = exFile;

    await bucket.file(filename).delete();

    await exFile.destroy();

    return res.status(200).json({ message: "file berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  uploadHandler,
  getAllFileHandler,
  editFileHandler,
  deleteFileHandler,
};