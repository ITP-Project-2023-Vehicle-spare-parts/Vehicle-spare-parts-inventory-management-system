const mongoose =require('mongoose');


const Schema =mongoose.Schema;
const warrentySchema =new Schema(
    {
       
        productname:{
            type:String
            
        },

        billno:{
            type:String
            
        },
        
        purchasedate:{
            type:String
            
        },
        claimdate:{
            type:String
            
        },

        description:{
            type : String 
            
        },

        email:{
            type:String
            
        },
        contactNo:{
            type:String
            
        },
       
        status:{
            type:String
            
        },
        branch:{
            type:String
        }


    }
)

const warrenty =mongoose.model("Warrenty",warrentySchema);
module.exports=warrenty;  