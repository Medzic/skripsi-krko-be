const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();

const saltRound = 10;
const secretKey = process.env.KRKO_JWT_SECRET;

const registerHandler = async (req, res) => {
  const { nama, email, telp, alamat, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
    const users = await User.create({
      nama,
      email,
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const adminRegisterHandler = async (req, res) => {
  const { nama, email, telp, alamat, role, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRound);

  try {
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

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
    }

    const adminToken = jwt.sign(
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
      .json({ message: "Admin Login successful", adminToken });
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
