const mongoose = require('mongoose');
const Product = require('../model/productModel'); 

const deletedStockSchema = new mongoose.Schema({


  
  
  productName: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  dateDeleted: {
    type: Date,
    default: Date.now,
  },
  stockAmount: {
    type: Number,
    required: true,
  },
  additionalDetails: String,
  reorderpoint: Number,
  stockQuantity: Number,
});

const DeletedStock = mongoose.model('DeletedStock', deletedStockSchema);

module.exports = DeletedStock;
