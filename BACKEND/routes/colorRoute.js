const express = require("express");
const { createColor, updateColor, deleteColor, getAColor, getAllColor } = require("../controller/colorController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addColor/",authMiddleware,isAdmin,createColor);
router.put("/updateColor/:id",authMiddleware,isAdmin,updateColor);
router.delete("/deletColor/:id",authMiddleware,isAdmin, deleteColor);
router.get("/getaColor/:id", getAColor);
router.get("/getAllColor", getAllColor);

module.exports = router;