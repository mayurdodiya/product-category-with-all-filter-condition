const controller = require('./../controller/product/product_controller')



module.exports = (app) => {
    // app.use(function (req, res, next) {
    //     res.header(
    //         "Access-Control-Allow-Headers",
    //         "x-access-token, Origin, Content-Type, Accept"
    //     );
    //     next();
    // });



    app.post('/api/products', controller.addProduct)
    app.get('/api/products', controller.getAll)
}