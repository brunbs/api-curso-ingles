'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Person.hasMany(models.Class, {
        foreignKey: 'teacher_id'
      })
      Person.hasMany(models.Registration, {
        foreignKey: 'student_id',
        scope: { status: 'confirmado' },
        as: 'confirmedRegistrations'
      })
    }
  }
  Person.init({
    name: {
      type: DataTypes.STRING,
        validate: {
            len: {
              args: [4,50],
              msg: 'Name must have between 4 and 50 characters'
            }
        }
    },
    active: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid e-mail'
        },
        len: {
          args: [4,50],
          msg: 'Email must have between 4 and 50 characters'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,50],
          msg: 'Role must have between 4 and 50 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Person',
    paranoid: true,
    defaultScope: {
      where: {
        active: true
      }
    },
    scopes: {
      all: {
        where: {}
      }
    }
  });
  return Person;
};