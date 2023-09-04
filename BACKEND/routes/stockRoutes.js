const express = require('express');
const router = express.Router();
const stockController = require('../controller/stockController.js');
const Stock = require('../model/stockModel'); // Import the Stock model


// Create a new stock
router.route('/add').post(stockController.addStock);
router.route('/update/:id').post(stockController.updateStock);
router.route('/get').post(stockController.getStock);




module.exports = router;