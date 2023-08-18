const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");
const {checkIsAdmin, verifyToken} = require("../middlewares/user.middleware")

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

router.get("/getProducts", verifyToken, controller.getProducts);

router.post("/createProduct", verifyToken, checkIsAdmin, controller.createProduct);

module.exports = router;