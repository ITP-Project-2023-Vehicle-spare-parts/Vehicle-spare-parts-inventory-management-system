const express = require("express");
const { createBrand, updateBrand, deleteBrand, getABrand, getAllBrand } = require("../controller/brandController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addBrand/",createBrand);
router.put("/updateBrand/:id",updateBrand);
router.delete("/deletBrand/:id",deleteBrand);
router.get("/getaBrand/:id", getABrand);
router.get("/",getAllBrand);

module.exports = router;