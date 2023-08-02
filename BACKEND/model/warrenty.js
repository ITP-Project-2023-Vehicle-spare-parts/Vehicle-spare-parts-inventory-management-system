const mongoose =require('mongoose');


const Schema =mongoose.Schema;
const warrentySchema =new Schema(
    {
       
        productid:{
            type:String,
            require:true
        },

        billno:{
            type:String,
            require:true
        },
        
        purchasedate:{
            type:String,
            required:true
        },
        claimdate:{
            type:String,
            require:true
        },

        email:{
            type:String,
            require:true
        },
        contactNo:{
            type:String,
            require:true
        }

    }
)

const warrenty =mongoose.model("Warrenty",warrentySchema);
module.exports=warrenty;  

  