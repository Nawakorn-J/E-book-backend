const express = require("express");
const router = express.Router();
const cartItemController = require("../controllers/cartItemController");

router.post("/", cartItemController.createCartItem);
router.patch("/productId", cartItemController.updateCartItem);
router.delete("/productId", cartItemController.deleteCart);

module.exports = router;
