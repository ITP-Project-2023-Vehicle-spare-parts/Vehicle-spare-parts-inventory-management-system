const express = require("express");
const router = express.Router();
const deliveryPersonController = require("../controller/deliverypersonController");


/*
router.route("/adddeliveryPeronController").post(deliveryPeronController.addDeliveryPerson);
router.route("/").get(deliveryPeronController.getAllDeliveryPerson);
router.route("/update/:id").put(deliveryPeronController.updateDeliveryPerson);
router.route("/delete/:id").delete(deliveryPeronController.deleteDeliveryPerson);
router.route("/get/:id").get(deliveryPeronController.getDeliveryPersonById);
*/
router.post("/adddeliveryPersonController", deliveryPersonController.addDeliveryPerson);
router.get("/", deliveryPersonController.getAllDeliveryPerson);
router.put("/update/:id", deliveryPersonController.updateDeliveryPerson);
router.delete("/delete/:id", deliveryPersonController.deleteDeliveryPerson);
router.get("/get/:id", deliveryPersonController.getDeliveryPersonById);


module.exports = router;
