// models/Offer.js
const mongoose = require('mongoose');
const Product = require('../model/productModel');  
const Schema = mongoose.Schema;

const offerSchema=new Schema({

    productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required:true,
  },


  offerID:{
    type :String ,
        required:true

  },


  rate: {
        type :String ,
        
    },


    description: {
        type :String ,
        
    },


    startDate: {
        type :Date ,
        
    },


    endDate: {
        type :Date,
        
    },

})

const Offer = mongoose.model("Offer",offerSchema);

module.exports = Offer;