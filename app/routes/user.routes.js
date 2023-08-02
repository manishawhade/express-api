const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

router.get("/getUsers", controller.getUsers);

router.post("/register", controller.register)

router.post("/login", controller.login)

module.exports = router;