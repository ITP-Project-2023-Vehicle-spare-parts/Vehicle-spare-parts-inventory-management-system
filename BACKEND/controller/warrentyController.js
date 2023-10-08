const Warrenty = require("../model/warrentyModel");

const getExistingBillNos = async (req, res) => {
    try {
        // Fetch all unique bill numbers from the database
        const uniqueBillNos = await Warrenty.distinct("billno");

        res.status(200).json(uniqueBillNos);
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error fetching existing bill numbers", error: err.message });
    }
};


const addclaim = async (req, res) => {
    try {
    const productname = req.body.productname;
    const billno = req.body.billno;
    const purchasedate = req.body.purchasedate;
    const claimdate = req.body.claimdate;
    const branch=req.body.branch;
    const description = req.body.description;
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const status = req.body.status;
    

        const newWarrenty = new Warrenty ({
            productname,
            billno,
            purchasedate,
            claimdate,
            branch,
            description,
            email,
            contactNo,
            status
     
        });

        await newWarrenty.save();
        res.json("claim Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding claim", error: err.message });
    }
};
const getAllwarrenties = async (req, res) => {
    try {
        const warrentys = await Warrenty
        .find();
        res.json(warrentys);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching warrenties", error: err.message });
    }
};

const updatewarrenty = async (req, res) => {
    try {
        const claimid = req.params.id;

        const { productname ,billno,purchasedate , claimdate,branch, description, email, contactNo,status} = req.body;


        const updatedWarrentyData = {
            productname ,billno,purchasedate , claimdate,branch, description, email, contactNo,status
        };

        await Warrenty.findByIdAndUpdate(claimid, updatedWarrentyData);
        res.status(200).send({ status: "claim Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating claim", error: err.message });
    }
};

const deleteClaim = async (req, res) => {
    try {
        const claimid = req.params.id;

        await Warrenty.findByIdAndDelete(claimid);
        res.status(200).send({ status: "claim Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting claim", error: err.message });
    }
};

const getClaimById = async (req, res) => {
    try {
        const billno = req.params.billno;

        const warrenty = await Warrenty.findOne({ billno: String(billno) });

        if (!warrenty) {
            // Handle the case when the warrenty with the given billno is not found
            res.status(404).send({ status: "Warrenty not found" });
            return;
          }
       
        res.status(200).send({ status: "Claim fetched", warrenty });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Claim", error: err.message });
    }
};

module.exports = {
    addclaim,
    getAllwarrenties,
    updatewarrenty,
    deleteClaim,
    getClaimById,
    getExistingBillNos,
};
