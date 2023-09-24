const express = require("express");
const router = express.Router();
const deliveringOrderController = require("../controller/deliveringOrderController");

router.post("/adddeliveryOrderController", deliveringOrderController.addDeliveryOrder);
router.get("/", deliveringOrderController.getAllDeliveryOrder);
router.put("/update/:id", deliveringOrderController.updateDelivertOrder);
// router.delete("/delete/:id", deliveringOrderController.deleteDeliveryOrder);
router.get("/get/:id", deliveringOrderController.getDeliveryOrderById);



module.exports = router;

