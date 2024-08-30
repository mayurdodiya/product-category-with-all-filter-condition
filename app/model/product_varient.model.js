module.exports = (sequelize, Sequelize) => {

    const ProductVarients = sequelize.define('product_varients', {
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        colour: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return ProductVarients
}