const express = require("express");
const { createColor, updateColor, deleteColor, getAColor, getAllColor } = require("../controller/colorController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addColor/",createColor);
router.put("/updateColor/:id",updateColor);
router.delete("/deletColor/:id", deleteColor);
router.get("/getaColor/:id", getAColor);
router.get("/getAllColor", getAllColor);

module.exports = router;