'use strict';
const { BOOLEAN } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    gooleid: DataTypes.STRING,
    facebookid: DataTypes.STRING,
    refreshtoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};