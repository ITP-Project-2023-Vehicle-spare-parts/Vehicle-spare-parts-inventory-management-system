const express = require("express");
const { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory } = require("../controller/productCategoryCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addCategory/",createCategory);
router.put("/updateCategoryProduct/:id",updateCategory);
router.delete("/deletCategoryProduct/:id", deleteCategory);
router.get("/getaCategoryProduct/:id", getACategory);
router.get("/getAllCategoryProduct", getAllCategory);

module.exports = router;