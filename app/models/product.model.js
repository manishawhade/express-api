const mongoose = require('mongoose');

const Product = mongoose.model(
    'Product',
    new mongoose.Schema({
        name: String,
        description: String,
        image: String,
        amount: Number,
        rating: Number,
        active: Boolean,
    })
);

module.exports = Product;