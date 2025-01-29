const express = require("express");
const router = express.Router();

const controller = require("../controllers/travelStory.controller");
const { authenticateToken } = require("../config/utilities");

router.post("/create", authenticateToken, controller.createPost);

router.get("/index", authenticateToken, controller.index);

module.exports = router;