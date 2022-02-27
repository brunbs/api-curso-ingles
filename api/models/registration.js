'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.Person, {
        foreignKey: 'student_id'
      })
      Registration.belongsTo(models.Class, {
        foreignKey: 'class_id'
      })
    }
  }
  Registration.init({
    status: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,50],
          msg: 'Status must have between 4 and 50 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Registration',
    paranoid: true
  });
  return Registration;
};