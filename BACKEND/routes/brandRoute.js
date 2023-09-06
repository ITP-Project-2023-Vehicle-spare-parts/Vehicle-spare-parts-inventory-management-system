const express = require("express");
const { createBrand, updateBrand, deleteBrand, getABrand, getAllBrand } = require("../controller/brandController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addBrand/",authMiddleware,isAdmin,createBrand);
router.put("/updateBrand/:id",authMiddleware,isAdmin,updateBrand);
router.delete("/deletBrand/:id",authMiddleware,isAdmin, deleteBrand);
router.get("/getaBrand/:id",authMiddleware,isAdmin, getABrand);
router.get("/getAllBrand",authMiddleware,isAdmin, getAllBrand);

module.exports = router;