const router = require("express").Router();
const { request, response, Router } = require("express");
let Supplier = require("../model/SupplierModel")
const path =require("path");

router.route("/addSupplier").post((req,res) => {

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

    const newSupplier =new Supplier({
        
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

    })
    newSupplier.save().then (() =>{
        res.json("Supplier Added")
    }).catch((err) => {
        console.log(err);
    }) 
    

})

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await Supplier.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status : "User Delete"} );
    }).catch((errr) => {
        console.log(errr.message);
        res.status(500).send({status : "Error with delete user", error : errr.message });
    })
})

router.route("/get/:id").get(async (req,res) => {
    let userId = req.params.id;

    const user = await Supplier.findById(userId).then((Supplier) => {
        res.status(200).send({status : "User fetched",Supplier });

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status : "Error with fetch user", error : err.message });
    })
})

module.exports = router;



