const Supplier = require("../model/SupplierModel");
// const slugify = require("slugify");

const addSupplier = async (req, res) => {
  try {
    const existingSupplier = await Supplier.findOne({
      SystemEmail: req.body.SystemEmail,
    });

    if (existingSupplier) {
      return res.status(400).json({
        status: "Error",
        error: "Supplier with this email already exists",
      });
    }

    const CompanyName = req.body.CompanyName;
    const CompanyEmail = req.body.CompanyEmail;
    const CompanyPhone = req.body.CompanyPhone;
    const CompanyAddress = req.body.CompanyAddress;
    const SupplierfirstName = req.body.SupplierfirstName;
    const SupplierLastName = req.body.SupplierLastName;
    const SupplierEmail = req.body.SupplierEmail;
    const SupplierPhone = req.body.SupplierPhone;
    const SupplierCity = req.body.SupplierCity;
    const SupplierState = req.body.SupplierState;
    const SupplierPostalCode = req.body.SupplierPostalCode;
    const SupplierAddress = req.body.SupplierAddress;
    const SupplierStatus = req.body.SupplierStatus;
    const ProvidedBrand = req.body.ProvidedBrand;
    const role = req.body.role;
    const dateAdded = req.body.dateAdded;
    const SystemEmail = req.body.SystemEmail;
    const SystemPassword = req.body.SystemPassword;

    const newSupplier = new Supplier({
      CompanyName,
      CompanyEmail,
      CompanyPhone,
      CompanyAddress,
      SupplierfirstName,
      SupplierLastName,
      SupplierEmail,
      SupplierPhone,
      SupplierAddress,
      SupplierStatus,
      SystemEmail,
      SystemPassword,
      SupplierCity,
      SupplierState,
      role,
      SupplierPostalCode,
      ProvidedBrand,
      dateAdded,
    });

    await newSupplier.save();
    res.json("Supplier Added");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error adding supplier", error: err.message });
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error fetching suppliers", error: err.message });
  }
};

const updateSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    const {
      CompanyName,
      CompanyEmail,
      CompanyPhone,
      CompanyAddress,
      SupplierfirstName,
      SupplierLastName,
      SupplierEmail,
      SupplierPhone,
      SupplierCity,
      SupplierState,
      SupplierPostalCode,
      SupplierAddress,
      SystemPassword,
    } = req.body;

    const updatesupplier = {
      CompanyName,
      CompanyEmail,
      CompanyPhone,
      CompanyAddress,
      SupplierfirstName,
      SupplierLastName,
      SupplierEmail,
      SupplierPhone,
      SupplierCity,
      SupplierState,
      SupplierPostalCode,
      SupplierAddress,
      SystemPassword,
    };

    await Supplier.findByIdAndUpdate(supplierId, updatesupplier);
    res.status(200).send({ status: "Supplier Updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error updating supplier", error: err.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    await Supplier.findByIdAndDelete(supplierId);
    res.status(200).send({ status: "Supplier Deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error deleting supplier", error: err.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;

    const supplier = await Supplier.findById(supplierId);
    res.status(200).send({ status: "Supplier fetched", supplier });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error fetching supplier", error: err.message });
  }
};

module.exports = {
  addSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
};
