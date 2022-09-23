'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submelody extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Submelody.belongsTo(models.User, {
        foreignKey: 'email',
      });
      models.Submelody.belongsTo(models.Melody, {
        foreignKey: 'melody_id',
      });
      models.Submelody.hasMany(models.SubMelody_like, {
        foreignKey: 'sub_melody_id',
      });
      // models.User.hasMany(models.Item, {
      //   foreignKey: 'user_email',
      // });
    }
  }
  Submelody.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      melody_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      instrument: {
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
      audio: {
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
      modelName: 'Submelody',
    }
  );
  return Submelody;
};
