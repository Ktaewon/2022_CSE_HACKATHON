'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Melody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Melody.belongsTo(models.User, {
        foreignKey: 'user_email',
      });
      models.Melody.belongsTo(models.Instrument, {
        foreignKey: 'my_instrument',
      });
      models.Melody.belongsTo(models.Instrument, {
        foreignKey: 'need_instrument',
      });
      models.Melody.belongsTo(models.Genre, {
        foreignKey: 'genre',
      });
      models.Melody.hasMany(models.Submelody, {
        foreignKey: 'melody_id',
      });
      models.Melody.hasMany(models.Comment, {
        foreignKey: 'melody_id',
      });
    }
  }
  Melody.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT('long'),
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deadline: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      hashtags: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      my_instrument: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      need_instrument: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      audio: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      genre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      is_valid: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: fn('now'),
      },
    },
    {
      sequelize,
      modelName: 'Melody',
    }
  );
  return Melody;
};
