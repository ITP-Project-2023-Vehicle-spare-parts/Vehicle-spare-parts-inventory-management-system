const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const supplierSchema = new Schema ({

    CompanyID: {
        type :String ,
        
    },
    CompanyName : {
        type :String ,
        
    },
    CompanyEmail : {
        type :String ,
        trim :true,
        
        
    },
    CompanyPhone : {
        type :String,
        
    },
    CompanyAddress : {
        type :String ,
        
    },
    SupplierfirstName : {
        type :String ,
        
    },
    SupplierLastName : {
        type :String ,
        
    },
    SupplierAge : {
        type :String ,
        
    },
    SupplierGender : {
        type :String ,
        enum :["male" ,"female"],

        
    },
    SupplierEmail : {
        type :String ,
        
    },
    SupplierPhone : {
        type :String,
        trim : true,
        
    },
    SupplierAddress : {
        type :String ,
        
    },
    SupplierStatus : { 
        type :String ,
        
    },
    Status : {
        type :String ,
        
    },
    ProvidedBrand : {
        type :String,
        enum :["Yamaha" ,"Bajaj","TVS" ,"DSI"] ,
        default :"Bajaj",


    },

    SystemEmail : {
        type :String ,
        trim : true,
        unique : true,
        
    },

    SystemPassword : {
        type :String ,
        trim : true,
        
    },
})

const Supplier = mongoose.model("Supplier" , supplierSchema);

module.exports = Supplier;