const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const deliveringOrderSchema = new Schema ({

    OrderID: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order",
        
    },
    deliveryPersonID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "DeliveryPerson",
        
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    orderStatus : {
        type : String,
        default : "delivery person assign"
    }

});


const DeliveringOrder = mongoose.model("DeliveringOrder" ,deliveringOrderSchema);

module.exports = DeliveringOrder;