'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pengajuan }) {
      // define association here
      this.hasMany(Pengajuan, { foreignKey: 'userId' })
    }

    // toJSON(){
    //   return{...this.get(), id: undefined}
    // }
  }
  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    telp: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
      allowNull:false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};