const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller");
const { checkIsAdmin, verifyToken } = require("../middlewares/user.middleware");

router.use(verifyToken);

router.get("/getProducts", controller.getProducts);

router.post("/createProduct", checkIsAdmin, controller.createProduct);

router.post("/updateProduct", checkIsAdmin, controller.updateProduct);

router.post("/deleteProduct", checkIsAdmin, controller.deleteProduct);

module.exports = router;
