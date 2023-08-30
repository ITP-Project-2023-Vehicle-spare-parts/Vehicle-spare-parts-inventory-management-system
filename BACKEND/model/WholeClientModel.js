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
  ClientsAge : {
        type :String ,
        
    },
  ClientsGender : {
        type :String ,
        
    },
  ClientsEmail : {
        type :String ,
        
    },
  ClientsPhone : {
        type :String,
        
    },
  ClientsAddress : {
        type :String ,
        
    },
  ClientsStatus : {
        type :String ,
        
    },
    NoOfBranches : {
        type : Number,
    },

    SystemEmail : {
        type :String ,
        
    },

     SystemPassword : {
        type :String ,
        
    },
},{timestamps : true})

const Clients = mongoose.model("Clients" ,clientSchema);

module.exports = Clients;