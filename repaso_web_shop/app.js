const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



//la pw no me agarraba en .env ni en nodemon.js así que no pude aislarla
mongoose.connect("mongodb+srv://tsandoval:tsandoval@cluster0.nezxj.mongodb.net/repasoweb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('Database is connected'))
.catch(err => console.log(err));



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');



app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error,status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;