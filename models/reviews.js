'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reservations, {
        targetKey: 'reservationId',
        foreignKey: 'reservationId',
        onDelete: 'cascade',
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
  Reviews.init(
    {
      reviewId: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      reservationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      petsitterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      userID: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      star: {
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
      modelName: 'Reviews',
    },
  );
  return Reviews;
};
