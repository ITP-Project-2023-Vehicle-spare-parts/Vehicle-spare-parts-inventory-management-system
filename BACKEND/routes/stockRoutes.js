const express = require('express');
const router = express.Router();
const stockController = require('../controller/stockController.js');
const Stock = require('../model/stockModel'); // Import the Stock model
const DeletedStock =require('../model/deletedStockModel'); // Import


// Create a new stock
router.route('/add').post(stockController.addStock);
router.route('/update/:id').put(stockController.updateStock);
router.route('/get').get(stockController.getStock);
router.route('/get/:id').get(stockController.getStockByID);
router.route('/delete/:id').delete(stockController.deleteStock);
router.route('/low-stock').get(stockController.getLowStockProducts);
router.route('/search/:search').get(stockController.searchStock);
router.route('/report').get(stockController.getStock);

// Get the cost of stock for a particular month
router.route('/getcost').get(stockController.getCost);



module.exports = router;