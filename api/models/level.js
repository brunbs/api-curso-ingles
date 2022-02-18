'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Level.hasMany(models.Class, {
        foreignKey: 'level_id'
      })
    }
  }
  Level.init({
    descr_level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Level',
    paranoid: true
  });
  return Level;
};