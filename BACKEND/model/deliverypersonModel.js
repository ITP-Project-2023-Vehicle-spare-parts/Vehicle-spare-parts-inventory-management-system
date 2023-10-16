const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const deliverypersonSchema = new Schema ({

    DeliveryPersonID: {
        type :String ,
        unique: true,
        
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
        unique: true,
        
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
    
    imageUrl :{
        type : String,
    },
    personStatus : {
        type : String,
        default : "available"
    }
});

deliverypersonSchema.pre('save', async function (next) {
    try {
        if (!this.DeliveryPersonID) {
            const latestDeliveryPerson = await this.constructor.findOne({}, {}, { sort: { 'DeliveryPersonID': -1 } });
            const latestID = latestDeliveryPerson ? parseInt(latestDeliveryPerson.DeliveryPersonID.slice(2), 10) : 0;
            this.DeliveryPersonID = `DP${(latestID + 1).toString().padStart(4, '0')}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});

//const DeliveryPerson = mongoose.model("DeliveryPerson" ,deliverypersonSchema);


const DeliveryPerson = mongoose.model("DeliveryPerson" ,deliverypersonSchema);

module.exports = DeliveryPerson;