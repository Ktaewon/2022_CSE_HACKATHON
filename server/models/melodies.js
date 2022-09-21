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
      models.Item.belongsTo(models.User, {
        foreignKey: 'email',
      });
      // models.User.hasMany(models.Item, {
      //   foreignKey: 'user_email',
      // });
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
      owner: {
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
        allowNull: false,
        type: DataTypes.STRING,
      },
      genre: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      likes: {
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
      modelName: 'User',
    }
  );
  return User;
};
