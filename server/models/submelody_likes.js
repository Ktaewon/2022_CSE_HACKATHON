'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubMelody_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.SubMelody_like.belongsTo(models.User, {
        foreignKey: 'email',
      });
      models.SubMelody_like.belongsTo(models.SubMelody_like, {
        foreignKey: 'id',
      });
    }
  }
  SubMelody_like.init(
    {
      sub_melody_id: {
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
      modelName: 'SubMelody_like',
    }
  );
  return SubMelody_like;
};
