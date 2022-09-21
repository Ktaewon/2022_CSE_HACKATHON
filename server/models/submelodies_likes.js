'use strict';
const { SubMelody_like, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubMelody_like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  SubMelody_like.init({
    sub_melody_id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },

    user_email: {
      allowNull: false,
      type: DataTypes.StRING,
    },
  });
  return SubMelody_like;
};
