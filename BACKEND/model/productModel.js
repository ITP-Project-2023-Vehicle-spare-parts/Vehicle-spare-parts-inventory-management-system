//require the mongoose to the model
const mongoose = require('mongoose');

//declare the schema of the product model
var productSchema = new mongoose.Schema({
    
    productID:{
        type: String,
        required: true,
        unique: true,
    },

    Title:{
        type: String,
        required: true,
        trim: true,
    },

    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    description:{
        type: String,
        required: true,
    },

    price:{
        type: Number,
        required: true,
    },

    discount:{
        type: Number,
        required: true,
    },

    category:{
        type: String,
        required: true,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Category",
    },

    brand:{
        type: String,
        //enum: ["Bajaj", "TVS", "Boxer", "Hero"]
        required: true,
    },

    images:{
        type: Array,
    },

    color:{
        type: String,
        //enum: ["Black", "Red", "Blue", "Yellow"]
        required: true,
    },

    ratings:{
        star: Number,
        postedby: {type: mongoose.Schema.Types.ObjectId, 
            ref: "User"}
    },
},
{timestamps: true}
);

const Product = mongoose.model("Product" , productSchema);

module.exports = Product;