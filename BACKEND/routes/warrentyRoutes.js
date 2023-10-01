const router = require("express").Router();
const WarrentyController = require("../controller/warrentyController");


router.route("/existingBillNos").get(WarrentyController.getExistingBillNos);

router.route("/addclaim").post(WarrentyController.addclaim);
router.route("/").get(WarrentyController. getAllwarrenties);
router.route("/update/:id").put(WarrentyController. updatewarrenty);
router.route("/delete/:id").delete(WarrentyController.deleteClaim);
router.route("/get/:billno").get(WarrentyController.getClaimById);


module.exports = router;