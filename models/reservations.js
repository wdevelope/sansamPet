'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Reviews, {
        sourceKey: 'reservationId',
        foreignKey: 'reservationId',
      });
      this.belongsTo(models.Users, {
        targetKey: 'userID',
        foreignKey: 'userID',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Petsitters, {
        targetKey: 'petsitterId',
        foreignKey: 'petsitterId',
        onDelete: 'cascade',
      });
    }
  }
  Reservations.init(
    {
      reservationId: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      petsitterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
      reservationAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
      isDelete: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Reservations',
    },
  );
  return Reservations;
};
