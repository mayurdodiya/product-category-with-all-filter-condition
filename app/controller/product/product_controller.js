const { query } = require('express')
const db = require('./../../model')

const Products = db.products
const ProductVarients = db.product_varients


exports.addProduct = async (req, res) => {

    try {
        const t = await db.sequelize.transaction()
        try {
            var obj = {
                product_name: req.body.product_name
            }
            const add = await Products.create(obj, { transaction: t })
            const bulkObj = [];

            for (let z = 0; z < req.body.varients.length; z++) {
                const obj = {
                    product_id: add.id,
                    colour: req.body.varients[z].colour,
                    price: req.body.varients[z].price,
                }
                bulkObj.push(obj)

            }

            await ProductVarients.bulkCreate(bulkObj, { transaction: t })
            await t.commit();
            return res.status(200).json({ success: true, message: 'Data added successfully!' })
        } catch (error) {
            console.log(error);
            await t.rollback();
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: error.message })
    }
}

const { Op, where } = require("sequelize");

exports.getAll = async (req, res) => {
    try {
        const obj = []
        const obj2 = []
        const query = {
            where: obj,
            attributes: ['id', 'product_name'],
            include: [
                { model: ProductVarients, as: 'productVarients', where: obj2, attributes: ['id', 'colour', 'price'] }
            ]
        }

        if (req.query.startsWith) {
            obj.push({ product_name: { [Op.startsWith]: req.query.startsWith } })
        }

        if (req.query.endsWith) {
            obj.push({ product_name: { [Op.endsWith]: req.query.endsWith } })
        }

        // only search with full name
        if (req.query.s) {
            obj.push({ product_name: { [Op.like]: `${req.query.s}%` } })
        }
        // not like product name
        if (req.query.notEquel) {
            obj.push({ product_name: { [Op.notLike]: `%${req.query.notEquel}%` } })
        }
        // search by price
        if (req.query.price) {
            obj2.push({ price: { [Op.like]: `%${req.query.price}%` } })
        }
        // search by price startsWith
        if (req.query.priceStartsWith) {
            obj2.push({ price: { [Op.gte]: req.query.priceStartsWith } })
        }
        // search by price endsWith
        if (req.query.priceEndsWith) {
            obj2.push({ price: { [Op.lte]: req.query.priceEndsWith } })
        }

        console.log(obj, '-------------------------------- query where obj');

        const data = await Products.findAll(query)
        return res.status(200).json({ success: true, message: 'Data get successfully!', data: data })
    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: error.message })
    }
}