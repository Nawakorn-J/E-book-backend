const express = require("express");
// const commentController = require("../controllers/commentController");
const productController = require("../controllers/productController");
// const fs = require("fs");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getProduct);

module.exports = router;
