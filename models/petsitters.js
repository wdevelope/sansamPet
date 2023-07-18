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
        sourceKey: 'petsitterId',
        foreignKey: 'petsitterId',
      });
      this.hasMany(models.Reviews, {
        sourceKey: 'petsitterId',
        foreignKey: 'petsitterId',
      });
    }
  }
  Petsitters.init(
    {
      petsitterId: {
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
      imgurl: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Petsitters',
    },
  );
  return Petsitters;
};
