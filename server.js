const express = require('express')
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

const db = require('./app/model')
// db.sequelize.sync();

require('./app/routes/product.routes')(app)
// db.products.destroy({ truncate: true})
// db.product_varients.destroy({ truncate: true})


var PORT = 5000
app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}!`);
})
//time 11:33
//time 01:45