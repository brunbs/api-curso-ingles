'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.Registration, {
        foreignKey: 'class_id'
      })
      Class.belongsTo(models.Person, {
        foreignKey: 'teacher_id'
      })
      Class.belongsTo(models.Level, {
        foreignKey: 'level_id'
      })
    }
  }
  Class.init({
    starting_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Class',
    paranoid: true
  });
  return Class;
};