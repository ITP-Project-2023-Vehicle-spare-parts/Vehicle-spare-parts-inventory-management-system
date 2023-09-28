const express = require("express");
const router = express.Router();
const couponController = require("../controller/couponController");



router.route("/addCoupon").post(couponController.addCoupon);

router.route("/").get(couponController.getAllCoupons);

router.route("/get/:id").get(couponController.getCouponById);

router.route("/update/:id").put(couponController.updateCoupon);

router.route("/delete/:id").delete(couponController.deleteCoupon);

module.exports = router;


