const express = require("express");
const router = express.Router();
const SupplierRequstController = require('../controller/SupplierRequstController')

router.route("/save-low-stock-order").post(SupplierRequstController.createLowStockOrder);
router.route("/requestlist").get(SupplierRequstController.getRequestList);
router.route("/deleteAll").delete(SupplierRequstController.deleteAllRequest);

module.exports = router;