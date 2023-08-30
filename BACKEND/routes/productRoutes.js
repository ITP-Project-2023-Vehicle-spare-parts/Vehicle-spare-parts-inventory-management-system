const express = require('express');
const { addProduct } = require('../controller/ProductController');
const router = express.Router();

router.post("/", addProduct);

module.exports = router;