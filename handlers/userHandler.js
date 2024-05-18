const { User } = require('../models');
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    const userId = req.userId

    try {
        const dataUser = await User.findByPk(userId)

        if (!dataUser) return res.status(404).json({ message: "Unauthorized User" });

        return res.json(dataUser)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const updateUser = async (req, res) => {
    const userId = req.userId

    const {
        nama,
        nik,
        email,
        telp,
        alamat,
    } = req.body

    try {
        const dataUser = await User.findByPk(userId)

        if (!dataUser) return res.status(404).json({ message: "Unauthorized User" });

        // Check if nik is provided and different from the current one
        if (nik && nik !== dataUser.nik) {
            const nikExists = await User.findOne({ where: { nik } });
            if (nikExists) {
                return res.status(401).json({ message: 'nik sudah didaftarkan' });
            }
        }

        // Check if email is provided and different from the current one
        if (email && email !== dataUser.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return res.status(401).json({ message: 'email telah didaftarkan' });
            }
        }

        if (nama) dataUser.nama = nama;
        if (nik) dataUser.nik = nik;
        if (email) dataUser.email = email;
        if (telp) dataUser.telp = telp;
        if (alamat) dataUser.alamat = alamat;


        await dataUser.save();
        return res.json(dataUser)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

const updatePassword = async (req, res) => {
    const userId = req.userId

    const { oldPassword, newPassword } = req.body;

    try {
        const userData = await User.findByPk(userId)

        if (!userData) {
            return res.status(404).json({ error: 'user tidak ditemukan' })
        }

        const isMatch = await bcrypt.compare(oldPassword, userData.hashedPassword)

        if (!isMatch) {
            return res.status(401).json({ error: 'Password salah' })
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10)

        userData.hashedPassword = newHashedPassword;

        await userData.save();

        return res.status(200).json({ message: 'Password berhasil diUpdate' })
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = {
    getUser,
    updateUser,
    updatePassword
}