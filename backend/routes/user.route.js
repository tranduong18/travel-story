const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const { authenticateToken } = require("../config/utilities");

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/get-user", authenticateToken, controller.getUser);

module.exports = router;