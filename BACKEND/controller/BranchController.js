/*
const Branch = require("../model/BranchModel");

//add branch
const addBranch=async(res,req)=>{
    try{
    const BranchID =req.body.BranchID;
    const BranchName=req.body.BranchName;
    const ManagerID=req.body.ManagerID;
    const ManagerName=req.body.ManagerName;
    const BranchAddress=req.body.BranchAddress;
    const TelePhoneNumber =req.body.TelePhoneNumber;

    const newBranch = new Branch({
        BranchID,
        BranchName,
        ManagerID,
        ManagerName,
        BranchAddress,
        TelePhoneNumber,

    }) 

    
    await newBranch.save();
        res.json("Branch Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding branch", error: err.message });
    }
};

const getAllBranch = async (req, res) => {
    try {
        const Branch = await Branch.find();
        res.json(suppliers);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching branch", error: err.message });
    }
};


//update
const updateBranch=async (req,res)=>{
    try{
    let userId = req.params.id;

    const {BranchID, BranchName,ManagerID,ManagerName,BranchAddress,TelePhoneNumber}=req.bodu;

    const updateBranch={
        BranchID,
        BranchName,
        ManagerID,
        ManagerName,
        BranchAddress,
        TelePhoneNumber
    }

    await Branch.findByIdAndUpdate(userId,updateBranch);
        res.status(200).send({status:"Branch Updated"});
   }catch (err){
    console.log(err);
    res.status(500).send({status:"Error with updating data",error:err.message});
        
    }
};


//delete
const deleteBranch=async(req,res)=>{
    try{
    const userId=req.params.id;
    
        await Branch.findByAndDelete(userId);
        res.status(200).send({status:"Branch deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status:"Error with delete branch",error:err.message});
    }
};


const getBranchById=async(req,res) =>{
    try{
       const userId=req.params.id;

       const Branch=await Branch.findById(userId);
       res.status(200).send({status: "Branch fetched",Branch});
    } catch (err) {
        console.log(err);
        res.status(500).send({status:"Error with get branch",error:err.message});
    }
};

module.exports = {
    addBranch,
    getAllBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
};
*/

const Branch = require("../model/BranchModel");

const addBranch = async (req, res) => {
    try {
        const { BranchID, BranchName, ManagerID, ManagerName, BranchAddress, TelePhoneNumber } = req.body;

        // Check if the branch with the given BranchID already exists
        const existingBranch = await Branch.findOne({ BranchID });

        if (existingBranch) {
            return res.status(400).json({ status: "Error adding branch", error: "Branch ID already exists" });
        }

        const newBranch = new Branch({
            BranchID,
            BranchName,
            ManagerID,
            ManagerName,
            BranchAddress,
            TelePhoneNumber,
        });

        await newBranch.save();
        res.status(200).json({ status: "Branch Added" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding branch", error: err.message });
    }
};


// getAllBranch
const getAllBranch = async (req, res) => {
    try {
        const branches = await Branch.find(); // Use `branches` instead of `suppliers`
        res.status(200).json(branches); // Send the branches as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error fetching branch", error: err.message });
    }
};

// updateBranch
const updateBranch = async (req, res) => {
    try {
        let userId = req.params.id;

        const { BranchID, BranchName, ManagerID, ManagerName, BranchAddress, TelePhoneNumber } = req.body; // Correct the typo in `req.bodu`

        const updateBranch = {
            BranchID,
            BranchName,
            ManagerID,
            ManagerName,
            BranchAddress,
            TelePhoneNumber,
        };

        await Branch.findByIdAndUpdate(userId, updateBranch);
        res.status(200).json({ status: "Branch Updated" }); // Use `res.status(200)`
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
};

// deleteBranch
const deleteBranch = async (req, res) => {
    try {
        const userId = req.params.id;

        await Branch.findByIdAndDelete(userId); // Correct the function name to `findByIdAndDelete`
        res.status(200).json({ status: "Branch deleted" }); // Use `res.status(200)`
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with delete branch", error: err.message });
    }
};

// getBranchById
const getBranchById = async (req, res) => {
    try {
        const userId = req.params.id;

        const branch = await Branch.findById(userId); // Use `branch` instead of `Branch`
        res.status(200).json({ status: "Branch fetched", branch }); // Send the branch as JSON
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with get branch", error: err.message });
    }
};

module.exports = {
    addBranch,
    getAllBranch,
    updateBranch,
    deleteBranch,
    getBranchById,
};
