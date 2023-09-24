const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const deliveringOrderSchema = new Schema ({

    OrderID: {
        type :String ,
        
    },
    DeliveryPersonID : {
        type :String ,
        
    },
    orderDetails : {
        type :String ,
        
        
    },
    customername : {
        type :String,
        
    },
    deliverypersonContactNumber : {
        type :String ,
        
    },
    branch : {
        type :String ,
        
    },
    CustomercontactNumber : {
        type :String ,
        
    },
    deliverypersonVehicleNumber : { 
        type :String ,
        
    },
    CustomerAddress : {
        type :String ,
        
    },
    deliverypersonUsername : {
        type :String,
    },
    orderStatus : {
        type : String,
    }

});


const DeliveringOrder = mongoose.model("DeliveringOrder" ,deliveringOrderSchema);

module.exports = DeliveringOrder;