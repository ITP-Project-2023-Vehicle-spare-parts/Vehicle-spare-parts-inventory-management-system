const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplierController");
const {
  authMiddleware,
  isSupplier,
  isAdmin,
} = require("../middlewares/authMiddleware");

router.route("/addSupplier").post(supplierController.addSupplier);
router.route("/").get(supplierController.getAllSuppliers);
router.route("/update/:id").put(supplierController.updateSupplier);
router.route("/delete/:id").delete(supplierController.deleteSupplier);
router.route("/get/:id").get(supplierController.getSupplierById);


module.exports = router;
