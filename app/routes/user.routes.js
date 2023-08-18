const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const {checkIfUserAlreadyExists, verifyToken} = require("../middlewares/user.middleware")

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
});

router.get("/getUsers", verifyToken, controller.getUsers);

router.post("/register", checkIfUserAlreadyExists, controller.register);

router.post("/login", controller.login);

router.post("/update", verifyToken, controller.update);

router.post("/delete", verifyToken, controller.deleteUser);

module.exports = router;