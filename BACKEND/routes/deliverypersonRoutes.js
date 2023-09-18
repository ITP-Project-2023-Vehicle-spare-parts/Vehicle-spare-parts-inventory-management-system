const express = require("express");
const router = express.Router();
const deliveryPersonController = require("../controller/deliverypersonController");


router.post("/adddeliveryPersonController", deliveryPersonController.addDeliveryPerson);
router.get("/", deliveryPersonController.getAllDeliveryPerson);
router.put("/update/:id", deliveryPersonController.updateDeliveryPerson);
router.delete("/delete/:id", deliveryPersonController.deleteDeliveryPerson);
router.get("/get/:id", deliveryPersonController.getDeliveryPersonById);


module.exports = router;
