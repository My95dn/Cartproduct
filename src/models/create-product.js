'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
    }
  };
  Product.init({
    Name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    Images: DataTypes.STRING,
    brand: DataTypes.STRING,
    weight: DataTypes.STRING,
    processor: DataTypes.STRING,
    ram: DataTypes.STRING,
    screenSize: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};