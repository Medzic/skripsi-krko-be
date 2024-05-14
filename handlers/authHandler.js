const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();

const saltRound = 10;
const secretKey = process.env.KRKO_JWT_SECRET;

const registerHandler = async (req, res) => {
  const { nama, email, nik, telp, alamat, password } = req.body;

  if(!password || !nik || !nama || !telp || !alamat){
    return res.status(400).json({error: "data tidak boleh kosong"})
  }

  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
    //filter apakah email sudah pernah medaftar
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email Sudah dipakai, silahkan pakai email lain" });
    }

    const users = await User.create({
      nama,
      email,
      nik,
      telp,
      alamat,
      hashedPassword,
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const loginHandler = async (req, res) => {
  const { nik, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        nik: nik,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "nik yang anda masukkan salah" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password yang anda masukkan salah" });
    }


    const token = jwt.sign(
      {
        userId: user.id,
        nik: user.nik,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const adminRegisterHandler = async (req, res) => {
  const { nama, email, telp, alamat, role, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
    //filter apakah email sudah pernah medaftar
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const users = await User.create({
      nama,
      email,
      telp,
      alamat,
      role,
      hashedPassword,
    });
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const adminLoginHandler = async (req, res) => {
  const { nama, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        nama: nama,
        role: "Admin",
      },
    });

    if(!user){
      return res.status(401).json({message: "Anda Bukan Admin!"})
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Password Salah!" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        nama: user.nama,
        role: "Admin",
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({ role: "Admin", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
  adminRegisterHandler,
  adminLoginHandler,
};
