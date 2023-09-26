const express = require("express");
const router = express.Router();
const OrderlistController = require("../controller/OrderlistController");

router.get("/allOrders", OrderlistController.getAllOrders);
router.put("/updateStatus/:orderid", OrderlistController.updateOrderStatus);

module.exports = router;