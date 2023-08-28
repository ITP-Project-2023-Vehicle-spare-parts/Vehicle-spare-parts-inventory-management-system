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
        
    },
    SupplierEmail : {
        type :String ,
        
    },
    SupplierPhone : {
        type :String,
        
    },
    SupplierAddress : {
        type :String ,
        
    },
    SupplierStatus : {
        type :String ,
        
    },

    SystemEmail : {
        type :String ,
        
    },

     SystemPassword : {
        type :String ,
        
    },
})

const Supplier = mongoose.model("Supplier" , supplierSchema);

module.exports = Supplier;