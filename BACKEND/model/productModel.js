//require the mongoose to the model
const mongoose = require('mongoose');

//declare the schema of the product model
var productSchema = new mongoose.Schema({

    productID: {
      type: String,
      //required: true,
      unique: true,
    },

    //serial number adding
    SerialNo: {
      type: String,
      //required: true,
      unique: true,
    },

    Title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      //required: true,
      //unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      //required: true,
    },

    category: {
      type: String,
      required: true,
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "Category",
    },

    brand: {
      type: String,
      //enum: ["Bajaj", "TVS", "Boxer", "Hero"]
      required: true,
    },

    sold: {
      type: Number,
      default: 0,
    },

    images: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    tags: {
      type: String,
      //required: true,
    },



    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      },
    ],

    totalrating: {
      type: String,
      default: 0,
    },
  },
  {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
