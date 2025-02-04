const express = require("express");
const router = express.Router();

const controller = require("../controllers/travelStory.controller");
const { authenticateToken } = require("../config/utilities");
const upload = require("../helpers/multer.helper");

router.post("/create", authenticateToken, controller.createPost);

router.get("/index", authenticateToken, controller.index);

router.post("/upload", upload.single("image"), controller.uploadPost);

router.delete("/delete-image", controller.deleteImage);

router.put("/edit/:id", authenticateToken, controller.edit);

router.delete("/delete/:id", authenticateToken, controller.delete);

router.put("/update-is-favorite/:id", authenticateToken, controller.updateFavorite);

router.get("/search", authenticateToken, controller.search);

module.exports = router;