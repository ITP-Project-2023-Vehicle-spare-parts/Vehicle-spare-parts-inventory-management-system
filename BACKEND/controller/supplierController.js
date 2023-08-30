const Supplier = require("../model/SupplierModel");
// const slugify = require("slugify");

const addSupplier = async (req, res) => {
    try {
        // if(req.body.SupplierStatus){
        //     req.body.Status = slugify(req.body.SupplierStatus);
        // }
        

    const CompanyID = req.body.CompanyID;
    const CompanyName = req.body.CompanyName;
    const CompanyEmail = req.body.CompanyEmail;
    const CompanyPhone = req.body.CompanyPhone;
    const CompanyAddress = req.body.CompanyAddress;
    const SupplierfirstName = req.body.SupplierfirstName;
    const SupplierLastName = req.body.SupplierLastName;
    const SupplierAge = req.body.SupplierAge;
    const SupplierGender = req.body.SupplierGender;
    const SupplierEmail = req.body.SupplierEmail;
    const SupplierPhone = req.body.SupplierPhone;
    const SupplierAddress = req.body.SupplierAddress ;
    const SupplierStatus= req.body.SupplierStatus;
    const SystemEmail= req.body.SystemEmail;
    const SystemPassword= req.body.SystemPassword;

        const newSupplier = new Supplier({
            CompanyID ,
            CompanyName ,
            CompanyEmail ,
            CompanyPhone ,
            CompanyAddress ,
            SupplierfirstName ,
            SupplierLastName ,
            SupplierAge ,
            SupplierGender,
            SupplierEmail ,
            SupplierPhone ,
            SupplierAddress,
            SupplierStatus,
            SystemEmail,
            SystemPassword,
        });

        await newSupplier.save();
        res.json("Supplier Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding supplier", error: err.message });
    }
};

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching suppliers", error: err.message });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id;

        const { SupplierfirstName , SupplierLastName , SupplierAge, SupplierGender, SupplierEmail, SupplierPhone,SupplierAddress, SystemPassword,} = req.body;


        const updatesupplier = {
            SupplierfirstName ,
            SupplierLastName ,
            SupplierAge ,
            SupplierGender,
            SupplierEmail ,
            SupplierPhone ,
            SupplierAddress,
            SystemPassword,
        };

        await Supplier.findByIdAndUpdate(supplierId, updatesupplier);
        res.status(200).send({ status: "Supplier Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating supplier", error: err.message });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const supplierId = req.params.id;

        await Supplier.findByIdAndDelete(supplierId);
        res.status(200).send({ status: "Supplier Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting supplier", error: err.message });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const supplierId = req.params.id;

        const supplier = await Supplier.findById(supplierId);
        res.status(200).send({ status: "Supplier fetched", supplier });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching supplier", error: err.message });
    }
};

module.exports = {
    addSupplier,
    getAllSuppliers,
    updateSupplier,
    deleteSupplier,
    getSupplierById,
};
