const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const deliverypersonSchema = new Schema ({

    DeliveryPersonID: {
        type :String ,
        
    },
    deliverypersonname : {
        type :String ,
        
    },
    deliverypersonGender : {
        type :String ,
        
        
    },
    deliverypersonDOB : {
        type :String,
        
    },
    deliverypersonContactNumber : {
        type :String ,
        
    },
    deliverypersonEmail : {
        type :String ,
        
    },
    deliverypersonNIC : {
        type :String ,
        
    },
    deliverypersonAddress : {
        type :String ,
        
    },
    deliverypersonDLN : {
        type :String ,
  
    },
    deliverypersonDLexpire : {
        type :String ,
        
    },
    deliverypersonExperience : {
        type :String,
    
    },
    deliverypersonVehicleType : {
        type :String ,
        
    },
    deliverypersonVehicleNumber : { 
        type :String ,
        
    },
    deliverypersonBranch : {
        type :String ,
        
    },
    deliverypersonUsername : {
        type :String,



    },

    deliverypersonPassword : {
        type :String ,

        
    },

    deliverypersonReEnter : {
        type :String ,
        
    },

    personStatus : {
        type : String,
        default : "available"
    }
});


const DeliveryPerson = mongoose.model("DeliveryPerson" ,deliverypersonSchema);

module.exports = DeliveryPerson;