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
        targetKey: 'reservation_id',
        foreignKey: 'reservation_id',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Users, {
        targetKey: 'user_id',
        foreignKey: 'user_id',
        onDelete: 'cascade',
      });
      this.belongsTo(models.Petsitters, {
        targetKey: 'petsitter_id',
        foreignKey: 'petsitter_id',
        onDelete: 'cascade',
      });
    }
  }
  Reviews.init(
    {
      review_id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      reservation_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      petsitter_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      user_id: {
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
