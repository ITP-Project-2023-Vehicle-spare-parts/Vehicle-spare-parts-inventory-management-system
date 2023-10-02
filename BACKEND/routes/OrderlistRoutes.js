const express = require("express");
const router = express.Router();
const OrderlistController = require("../controller/OrderlistController");

router.get("/allOrders", OrderlistController.getAllOrders);
router.put("/updateStatus/:orderid", OrderlistController.updateOrderStatus);
router.put("/updateLocations/:orderid", OrderlistController.updateBranchLocation);
router.get("/getOrderByID/:id", OrderlistController.getOrderById);
router.get("/branchAdding", OrderlistController.getOrders);
router.get("/orderHistory", OrderlistController.getOrderHistory);


module.exports = router;