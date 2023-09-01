const express=require ("express");
const router = express.Router();
const BranchController=require("../controller/BranchController");


router.route("/addBranch").post(BranchController.addBranch);
router.route("/").get(BranchController.getAllBranch);
router.route("/update/:id").put(BranchController.updateBranch);
router.route("/delete/:id").delete(BranchController.deleteBranch);
router.route("/get/:id").get(BranchController.getBranchById);


module.exports=router;