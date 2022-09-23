'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Instrument.hasMany(models.Melody, {
        foreignKey: 'my_instrument',
      });
      models.Instrument.hasMany(models.Melody, {
        foreignKey: 'need_instrument',
      });
      models.Instrument.hasMany(models.Submelody, {
        foreignKey: 'instrument',
      });
    }
  }
  Instrument.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Instrument',
    }
  );
  return Instrument;
};
