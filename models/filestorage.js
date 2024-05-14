"use strict";
const { 
  Model 
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Filestorage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pengajuan }) {
      // define association here
      this.belongsTo(Pengajuan, { foreignKey: 'pengajuanId'})
    }
  }
  Filestorage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pengajuanId: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "filestorages",
      modelName: "Filestorage",
    }
  );
  return Filestorage;
};
