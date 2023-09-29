const express=require ("express");
const router = express.Router();
const OffersController=require("../controller/OffersController");


router.route("/addOffer").post(OffersController.addOffer);
router.route("/").get(OffersController.getOffers);
router.route("/update/:id").put(OffersController.updateOffer);
router.route("/delete/:id").delete(OffersController.deleteOffer);
router.route("/getOffer/:offerID").get(OffersController.getOfferByOfferID);
router.route("/get/:id").get(OffersController.getOfferById,);


module.exports=router;