const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
    var userSchema = new mongoose.Schema(
        { 
        firstname:{
            type:String,
            required:true,
            index:true,
        },
        lastname:{
            type:String,
            required:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        nic:{
            type:String,
            required:true,
            unique:true,
        },
      
        street:{
            type: String,
        },
        city:{
            type: String,
        } ,
        state:{
            type: String,
        },
        postalcode:{
            type: String,
        }, 
        mobile:{
            type:String,
            required:true,
            unique:true,
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
        },
        isBlocked:{
            type:Boolean,
            default: false,
        },
        refreshToken:{
            type:String,
            
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        },
    {   
        timestamps: true,
    }
    );


    userSchema.pre("save", async function(next){
        if(!this.isModified('password')){
            next();
        }
        const salt = await bcrypt.genSaltSync(10);
        this.password= await bcrypt.hash(this.password, salt);
        next();
    });
    
    userSchema.methods.isPasswordMatched= async function(enteredPassword){
        return await bcrypt.compare(enteredPassword, this.password);    
    };

    userSchema.methods.createPasswordResetToken= async function(){
        const resettoken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken= crypto
        .createHash('sha256')
        .update(resettoken)
        .digest('hex');
        this.passwordResetExpires= Date.now() + 30*60*1000; //10 mins
        return resettoken;
    
    };

//Export the model
module.exports = mongoose.model('User', userSchema);