'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // ganti password disini
    const hashedPassword = await bcrypt.hash('12345', 10);

    await queryInterface.bulkInsert('users', [
      {
        nama: 'Admin1',
        email: 'admin1@mail.com',
        nik: 1234567890,
        telp: '1234567890',
        alamat: 'Admin Address',
        role: 'Admin',
        hashedPassword: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin1@mail.com' }, {});
  }
};
