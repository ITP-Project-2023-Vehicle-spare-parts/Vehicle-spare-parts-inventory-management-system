const express = require("express");
const router = express.Router();
const ClientsController = require("../controller/WholeClientController");


router.route("/addClients").post(ClientsController.addClients);
router.route("/").get(ClientsController.getAllClients);
router.route("/update/:id").put(ClientsController.updateClients);
router.route("/delete/:id").delete(ClientsController.deleteClients);
router.route("/get/:id").get(ClientsController.getClientsById);


module.exports = router;
