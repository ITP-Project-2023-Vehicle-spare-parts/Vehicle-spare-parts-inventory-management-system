const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplierController");
const { authMiddleware, isSupplier,isAdmin} = require("../middlewares/authMiddleware");



router.route("/addSupplier").post(supplierController.addSupplier);
router.route("/").get(supplierController.getAllSuppliers);
router.route("/update/:id").put(authMiddleware,isSupplier,supplierController.updateSupplier);
router.route("/delete/:id").delete(authMiddleware,isAdmin,supplierController.deleteSupplier);
router.route("/get/:id").get(authMiddleware,isAdmin,supplierController.getSupplierById);
router.route("/getprofile/:id").get(authMiddleware,isSupplier,supplierController.getSupplierById);



module.exports = router;
