const express = require('express');
const app = express();
// const port = 3000;
const mongoose = require('mongoose');

app.use(express.json());

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


mongoose.connect(process.env.MONGODB_URI).then(
        () => {console.log("Connection with MongoDB enstablised...")},
        err => {console.log("Failed to connect to MongoDB!", err)}
    );

const cors = require ('cors');
app.use(cors({
    origin:'*'
}))


const user = require('./routes/user.route');
const product = require('./routes/product.route');
// const userProduct = require('./routes/user.products.route');


app.use('/', express.static('files'))
app.use('/api/users', user)
// app.use('/api/user-products',userProduct)
app.use('/api/products', product)


app.use('/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument.options)
    )


// app.listen(port, () => {
//     console.log("Server running...")
// });

module.exports = app;