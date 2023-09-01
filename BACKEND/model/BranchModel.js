const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const branchSchema=new Schema({

    BranchID: {
        type :String ,
        required:true
        
    },

    BranchName: {
        type :String ,
        
    },

    ManagerID: {
        type :String ,
        required:true
        
    },

    ManagerName: {
        type :String ,
        
    },

    BranchAddress:{
        type:String

    },

    TelePhoneNumber:{
        type:String
    },

})

const Branch = mongoose.model("Branch",branchSchema);

module.exports = Branch;
