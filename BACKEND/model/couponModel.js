const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const couponSchema=new Schema({

    code: {
        type :String ,
        required:true
        
    },

    discount: {
        type :String ,
        
    },

    description: {
        type :String ,
        required:true
        
    },

    expirationDate: {
        type :Date ,
        
    },


})

const Coupon = mongoose.model("Coupon",couponSchema);

module.exports = Coupon;
