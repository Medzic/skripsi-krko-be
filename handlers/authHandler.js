const {User} = require("../models");


const registerHandler = async(req,res) => {
    const { nik, nama, email, telp, alamat, role } = req.body;

    try {
        const users = await User.create({nik, nama, email, telp, alamat, role})
        return res.json(users)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
}

module.exports = {
    registerHandler,
}