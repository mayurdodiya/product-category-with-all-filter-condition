module.exports = (sequelize, Sequelize) => {

    const Products = sequelize.define('products', {
        product_name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Products
}