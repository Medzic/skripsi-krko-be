'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Pengajuans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      noreg: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      },
      tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      namep: {
        type: DataTypes.STRING,
        allowNull: false
      },
      namep1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      namep2: {
        type: DataTypes.STRING
      },
      nikp1: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      nikp2: {
        type: DataTypes.BIGINT
      },
      telp: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      alamat: {
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
      kota: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('Pengajuans');
  }
};