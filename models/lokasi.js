'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pengajuan }) {
      // define association here
      this.belongsTo(Pengajuan, { foreignKey: 'pengajuanId' })
    }
  }
  Lokasi.init({
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
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'lokasis',
    modelName: 'Lokasi',
  });
  return Lokasi;
};