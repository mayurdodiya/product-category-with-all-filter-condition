const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('employeedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});


const db = {}
db.products = require('./product.model')(sequelize, Sequelize)
db.product_varients = require('./product_varient.model')(sequelize, Sequelize)

// join relation define
db.products.hasMany(db.product_varients, { foreignKey: 'product_id', as: 'productVarients' })


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}