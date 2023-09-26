const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deletedsupplierSchema = new Schema(
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

    dateDeleted: {
      type: Date,
      default: Date.now,
    },

    ProvidedBrand: {
      type: String,
      default: "Bajaj",
    },

    SystemEmail: {
      type: String,
      trim: true,
      unique: true,
    },

    SystemPassword: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const DeletedSupplier = mongoose.model("DeletedSupplier", deletedsupplierSchema );

module.exports = DeletedSupplier;
