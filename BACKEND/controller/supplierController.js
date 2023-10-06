const Supplier = require("../model/SupplierModel");
const DeletedSupplier = require("../model/DeletedSupplierModel");
// const slugify = require("slugify");

const addSupplier = async (req, res) => {
  try {
    const existingSupplier = await Supplier.findOne({
      SystemEmail: req.body.SystemEmail,
    });

    if (existingSupplier) {
      return res.status(400).json({
        status: "Error",
        message: "Supplier with this email already exists",
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
    const ProvidedCategory = req.body.ProvidedCategory;
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
      ProvidedCategory,
      dateAdded,
    });

    await newSupplier.save();
    res.json(newSupplier);
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

    // Find the supplier to be deleted
    const supplierToDelete = await Supplier.findById(supplierId);

    if (!supplierToDelete) {
      return res.status(404).send({ status: "Supplier not found" });
    }

    // Create a new DeletedSupplier document and populate it with the supplier's data
    const historySupplier = new DeletedSupplier({
      SystemEmail: supplierToDelete.SystemEmail,
      CompanyName: supplierToDelete.CompanyName,
      CompanyEmail: supplierToDelete.CompanyEmail,
      CompanyPhone: supplierToDelete.CompanyPhone,
      CompanyAddress: supplierToDelete.CompanyAddress,
      SupplierfirstName: supplierToDelete.SupplierfirstName,
      SupplierLastName: supplierToDelete.SupplierLastName,
      SupplierEmail: supplierToDelete.SupplierEmail,
      SupplierPhone: supplierToDelete.SupplierPhone,
      SupplierCity: supplierToDelete.SupplierCity,
      SupplierState: supplierToDelete.SupplierState,
      SupplierPostalCode: supplierToDelete.SupplierPostalCode,
      SupplierAddress: supplierToDelete.SupplierAddress,
      SystemPassword: supplierToDelete.SystemPassword,
    });

    // Save the deleted supplier data to the DeletedSupplier collection
    await historySupplier.save();

    // Delete the supplier from the Supplier collection
    await Supplier.findByIdAndDelete(supplierId);

    res.status(200).send({ status: "Supplier Deleted" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error deleting supplier", error: err.message });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplierId = req.params.id;

    console.log(supplierId);

    const supplier = await Supplier.findById(supplierId);
    res.status(200).send({ status: "Supplier fetched", supplier });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error fetching supplier", error: err.message });
  }
};

const getUserSupplierByEmail = async (req, res) => {
  try {
    const supplierEmail = req.params.id;

    // Assuming Supplier is your Mongoose model
    const supplier = await Supplier.findOne({ SystemEmail: supplierEmail });

    if (!supplier) {
      return res.status(404).send({ status: "Supplier not found" });
    }

    res.status(200).send({ status: "Supplier fetched", supplier });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "Error fetching supplier", error: err.message });
  }
};

const countSuppliers = async (req, res) => {
  try {
    const SupplierCount = await Supplier.countDocuments({});
    console.log(`Total Shipment: ${SupplierCount}`);
  } catch (error) {
    console.error("Error counting orders:", error);
  }
};

module.exports = {
  addSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
  getUserSupplierByEmail,
  countSuppliers,
};
