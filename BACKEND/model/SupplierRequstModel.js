const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const supplierReqSchema = new Schema({

    SupplierName : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",   
    },
    SupplierEmail : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier", 
    },
    dateAdded: {
        type: Date,
       default:Date.now,
      },





},{timestamps:true});

const supplierReq = mongoose.model('supplierReq', supplierReqSchema);
module.exports = supplierReq;

