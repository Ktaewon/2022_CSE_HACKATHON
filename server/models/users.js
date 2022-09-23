'use strict';
const { Model, fn } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Melody, {
        foreignKey: 'user_email',
      });
      models.User.hasMany(models.Melody_like, {
        foreignKey: 'user_email',
      });
      models.User.hasMany(models.Submelody, {
        foreignKey: 'user_email',
      });
      models.User.hasMany(models.SubMelody_like, {
        foreignKey: 'user_email',
      });
      models.User.hasMany(models.Comment, {
        foreignKey: 'user_email',
      });
      models.User.belongsToMany(models.User, {
        foreignKey: 'followee',
        through: 'Follows',
      });
      models.User.belongsToMany(models.User, {
        foreignKey: 'follower',
        through: 'Follows',
      });
      // models.User.hasMany(models.LeaseContract, {
      //   foreignKey: 'user_email',
      // });
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      salt: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
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
