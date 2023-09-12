const mongoose = require('mongoose');

const db = {}

db.mongoose = mongoose

db.user = require("./user.model")
db.product = require("./product.model")

module.exports = db