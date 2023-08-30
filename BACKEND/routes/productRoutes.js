const express = require('express');
const { 
    addProduct, 
    getaProduct, 
    getAllProduct, 
    editProduct, 
    removeProduct} = require('../controller/productController');

const router = express.Router();

router.post("/createProduct/", addProduct);
router.get("/getById/:id", getaProduct);
router.get("/getAllProducts", getAllProduct);
router.put("/updateProduct/:id", editProduct);
router.delete("/deleteProduct/:id", removeProduct);

module.exports = router;