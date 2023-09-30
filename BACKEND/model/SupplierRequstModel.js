const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const supplierReqSchema = new Schema({

    supplierId : {
        type:String,
          
    },
    suppliername:String,
    
    stockQuantity: Number,
    reorderpoint: Number,
    productname :String,
    neededStockQuantity : { 
        type:Number,
    },
    yearAdded: {
        type: Number,
        default: new Date().getFullYear(),
    },
    monthAdded: {
        type: Number,
        default: new Date().getMonth() + 1, // Adding 1 because months are zero-indexed
    },
    dayAdded: {
        type: Number,
        default: new Date().getDate(),
    },




},{timestamps:true});

const supplierReq = mongoose.model('supplierReq', supplierReqSchema);
module.exports = supplierReq;

