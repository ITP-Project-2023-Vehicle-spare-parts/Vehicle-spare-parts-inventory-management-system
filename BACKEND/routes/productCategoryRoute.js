const express = require("express");
const { createCategory } = require("../controller/productCategoryCtrl");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

router.post("/addCategory/",authMiddleware, isAdmin,createCategory);
module.exports = router;