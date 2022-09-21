'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Melody_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Melody_like.belongsTo(models.Melody, {
        foreignKey: 'id',
      });
      models.Melody_like.belongsTo(models.User, {
        foreignKey: 'email',
      });
    }
  }
  Melody_like.init(
    {
      melody_id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },

      user_email: {
        allowNull: false,
        type: DataTypes.StRING,
      },
    },
    {
      sequelize,
      modelName: 'Melody_like',
    }
  );
  return Melody_like;
};
