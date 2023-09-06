const express = require("express");
const { createCategory, updateCategory, deleteCategory, getACategory, getAllCategory } = require("../controller/productCategoryCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addCategory/",authMiddleware, isAdmin,createCategory);
router.put("/updateCategoryProduct/:id",authMiddleware, isAdmin,updateCategory);
router.delete("/deletCategoryProduct/:id",authMiddleware, isAdmin, deleteCategory);
router.get("/getaCategoryProduct/:id",authMiddleware, isAdmin, getACategory);
router.get("/getAllCategoryProduct", getAllCategory);

module.exports = router;