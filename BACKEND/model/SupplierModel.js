const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierSchema = new Schema(
  {
    CompanyName: {
      type: String,
    },
    CompanyEmail: {
      type: String,
      trim: true,
    },
    CompanyPhone: {
      type: String,
    },
    CompanyAddress: {
      type: String,
    },
    SupplierfirstName: {
      type: String,
    },
    SupplierLastName: {
      type: String,
    },

    SupplierEmail: {
      type: String,
    },
    SupplierPhone: {
      type: String,
      trim: true,
    },
    SupplierState: {
      type: String,
    },
    SupplierCity: {
      type: String,
    },
    SupplierPostalCode: {
      type: String,
    },
    SupplierAdress: {
      type: String,
    },
    SupplierStatus: {
      type: String,
    },
    role: {
      type: String,
      default: "supplier",
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },

    ProvidedBrand: {
      type: String,
      default: "Bajaj",
    },
    ProvidedCategory: {
      type: String,
    },


    SystemEmail: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },

    SystemPassword: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
