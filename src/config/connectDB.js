const { Sequelize  } = require('sequelize');




const sequelize = new Sequelize('databasewebsite', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});
const handleErro = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
module.exports = handleErro