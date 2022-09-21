'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Follow.init(
    {
      follower: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      followee: {
        allowNull: false,
        type: DataTypes.StRING,
      },
    },
    {
      sequelize,
      modelName: 'Follow',
    }
  );
  return Follow;
};
