'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petsitters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Reservations, {
        sourceKey: 'petsitter_id',
        foreignKey: 'petsitter_id',
      });
      this.hasMany(models.Reviews, {
        sourceKey: 'petsitter_id',
        foreignKey: 'petsitter_id',
      });
    }
  }
  Petsitters.init(
    {
      petsitter_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      signInCareer: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Petsitters',
    },
  );
  return Petsitters;
};
