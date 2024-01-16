'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengajuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Lokasi }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })
      this.hasOne(Lokasi, { foreignKey: 'pengajuanId' })
    }
  }
  Pengajuan.init({
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
    }
  }, {
    sequelize,
    tableName: 'pengajuans',
    modelName: 'Pengajuan',
  });
  return Pengajuan;
};