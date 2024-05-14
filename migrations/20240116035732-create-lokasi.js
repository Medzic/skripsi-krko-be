'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Lokasis', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      loktanah:{
        type: DataTypes.STRING,
        allowNull: false
      },
      rt: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      rw: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      keperluan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stanah: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nocert: {
        type: DataTypes.STRING,
        allowNull: false
      },
      luas: {
        type: DataTypes.STRING,
        allowNull: false
      },
      atasnama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pengajuanId: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lokasis');
  }
};