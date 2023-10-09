const express = require("express");
const router = express.Router();
const OrderlistController = require("../controller/OrderlistController");

router.get("/allOrders", OrderlistController.getAllOrders);
router.put("/updateStatus/:orderid", OrderlistController.updateOrderStatus);
router.put("/updateLocations/:orderid", OrderlistController.updateBranchLocation);
router.get("/getOrderByID/:id", OrderlistController.getOrderById);
router.get("/branchAdding", OrderlistController.getOrders);
router.get("/orderHistory", OrderlistController.getOrderHistory);
router.put("/updatedeliverypersonid/:orderid", OrderlistController.updateDeliveryPersonID);
router.get("/ordersByBranch", OrderlistController.getOrdersByBranch);
router.get("/AllOrdersForDelivery", OrderlistController.getAllOrdersForDeliveryPerson);
router.get("/OrderByDeliveryPersonID/:id", OrderlistController.getOrdersByDeliveryPersonId);
router.get("/ordersByMonth", OrderlistController.getOrdersByMonth);

module.exports = router;