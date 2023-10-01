const express = require("express");
const router = express.Router();
const getDeliveredOrderController = require("../controller/getDeliveredOrderController");


router.get("/deliveredOrder", getDeliveredOrderController.getDeliveredOrders);

module.exports = router;