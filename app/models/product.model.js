const mongoose = require("mongoose");

var Description = new mongoose.Schema({
  heading: String,
  points: [],
});

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    img: String,
    title: String,
    price: String,
    packSize: String,
    specialInfo: String,
    features: Array,
    aroma: String,
    usage: String,
    stock: String,
    offer: String,
    category: String,
    subCategory: String,
    subSubCategory: String,
    description: [Description],
    benefits: Array,
    herbalExtracts: [Description],
    usageDirection: Array,
  })
);

module.exports = Product;
