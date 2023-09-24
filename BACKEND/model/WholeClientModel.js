const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const clientSchema = new Schema ({

 
  ClientsfirstName : {
        type :String ,
        
    },
  ClientsLastName : {
        type :String ,
        
    },

  ClientsFullName : {
        type :String,
    },
 

  ClientsEmail : {
        type :String ,
        
    },
  ClientsPhone : {
        type :String,
        
    },
  ClientsState : {
      type :String ,
      
  },
  ClientsCity : {
      type :String ,
      
  },
  ClientsPostalCode : {
      type :String ,
      
  },

   ClientsStatus : {
        type :String ,
        
    },
    NoOfBranches : {
        type :String,
    },
    role : {
        type : String,
        default : "client",
  
  
      },
    dateAdded: {
        type: Date,
        default:Date.now,
       },

    SystemEmail : {
        type :String ,
        required: true,
        
    },

     SystemPassword : {
        type :String ,
        
    },
},{timestamps : true})

const Clients = mongoose.model("Clients" ,clientSchema);

module.exports = Clients;