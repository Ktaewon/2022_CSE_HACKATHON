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
        foreignKey: 'melody_id',
      });
      models.Melody_like.belongsTo(models.User, {
        foreignKey: 'user_email',
      });
    }
  }
  Melody_like.init(
    {
      melody_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Melody_like',
    }
  );
  return Melody_like;
};
