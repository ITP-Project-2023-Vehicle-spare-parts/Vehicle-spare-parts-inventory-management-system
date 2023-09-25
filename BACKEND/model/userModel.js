const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
    firstname:{
        type:String,
        
        index:true,
    },
    lastname:{
        type:String,
        
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    nic:{
        type:String,
        
    },
    dob:{
        type:String,
        
    },
    address:{
        type:String,
        
    },
    mobile:{
        type:String,
       
    },
    gender:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
        enum :["user" ,"supplier","admin","client"],
    },
},
{   
    timestamps: true,
}
);

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSaltSync(10);
    this.password= await bcrypt.hash(this.password, salt)
});

userSchema.methods.isPasswordMatched= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
module.exports = mongoose.model('User', userSchema);