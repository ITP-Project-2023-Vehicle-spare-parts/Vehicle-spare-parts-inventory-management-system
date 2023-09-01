const mongoose = require('mongoose');
const Product = require('../model/productModel');  

const Schema = mongoose.Schema;

const stockSchema = new Schema({



productName: {
    type: String,
    
    unique: true, // Ensure that the  stock category is unique
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
   
  },

  supplierName: {
    type: String,
   
  },



  dateAdded: {
    type: Date,
   default:Date.now,
  },


  stockAmount: {
    type: Number,
   
    min: 0, // Stock Amount should be a positive number

  },

  additionalDetails: {
    type: String,
   
  },
  reorderpoint: {
    type: Number,
    
    min:0, // Quantity should be a positive number
  },

  stockQuantity: {
    type: Number,
   
    min:0, // Quantity should be a positive number
  },





});

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock