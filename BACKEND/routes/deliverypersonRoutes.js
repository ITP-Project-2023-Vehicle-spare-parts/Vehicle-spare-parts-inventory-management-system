const express = require("express");
const router = express.Router();
const deliveryPersonController = require("../controller/deliverypersonController");
const DeliveryPerson = require('../model/deliverypersonModel'); 


router.post("/adddeliveryPersonController", deliveryPersonController.addDeliveryPerson);
router.get("/", deliveryPersonController.getAllDeliveryPerson);
router.put("/update/:id", deliveryPersonController.updateDeliveryPerson);
router.delete("/delete/:id", deliveryPersonController.deleteDeliveryPerson);
router.get("/get/:id", deliveryPersonController.getDeliveryPerson);
router.get("/getById/:id", deliveryPersonController.getDeliveryPersonById);
router.get("/getByMail/:email", deliveryPersonController.getDeliveryPersonByMail);
router.get("/getdeliveryPersonForOrder", deliveryPersonController.getAllDeliveryPersonForOrder);
router.get('/latestID', async (req, res) => {
    try {
      const latestDeliveryPerson = await DeliveryPerson.findOne({}, {}, { sort: { 'DeliveryPersonID': -1 } });
  
      if (latestDeliveryPerson && latestDeliveryPerson.DeliveryPersonID) {
        const latestID = parseInt(latestDeliveryPerson.DeliveryPersonID.slice(2), 10);
  
        if (!isNaN(latestID)) {
          res.status(200).json({ latestID: `DP${(latestID).toString().padStart(4, '0')}` });
        } else {
          res.status(500).json({ error: 'Error parsing latest ID' });
        }
      } else {
        res.status(404).json({ error: 'No Delivery Person found' });
      }
    } catch (error) {
      console.error('Error getting latest Delivery Person ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;