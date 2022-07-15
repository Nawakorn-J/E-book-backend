const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrders);
router.get("/", orderController.getMyOrder);
router.delete("/:orderItemId", orderController.deleteOrderItem);
module.exports = router;
