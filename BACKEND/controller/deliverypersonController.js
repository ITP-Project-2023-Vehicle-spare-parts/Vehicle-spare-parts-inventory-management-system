
const DeliveryPerson = require('../model/deliverypersonModel');

const addDeliveryPerson = async (req, res) => {
    try {
        const existingDeliveryPerson = await DeliveryPerson.findOne({ deliverypersonUsername: req.body.deliverypersonUsername });

        if (existingDeliveryPerson) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this username already exists" });
        }

        // Use a different variable name (e.g., newDeliveryPerson) for the instance
        const newDeliveryPerson = new DeliveryPerson({
            DeliveryPersonID: req.body.DeliveryPersonID,
            deliverypersonname: req.body.deliverypersonname,
            deliverypersonGender: req.body.deliverypersonGender,
            deliverypersonDOB : req.body.deliverypersonDOB,
            deliverypersonContactNumber : req.body.deliverypersonContactNumber,
            deliverypersonEmail : req.body.deliverypersonEmail,
            deliverypersonNIC : req.body.deliverypersonNIC,
            deliverypersonAddress : req.body.deliverypersonAddress,
            deliverypersonDLN : req.body.deliverypersonDLN,
            deliverypersonDLexpire : req.body.deliverypersonDLexpire,
            deliverypersonExperience : req.body.deliverypersonExperience,
            deliverypersonVehicleType : req.body.deliverypersonVehicleType ,
            deliverypersonVehicleNumber: req.body.deliverypersonVehicleNumber,
            deliverypersonBranch: req.body.deliverypersonBranch,
            deliverypersonUsername: req.body.deliverypersonUsername,
            deliverypersonPassword: req.body.deliverypersonPassword,
            deliverypersonReEnter: req.body.deliverypersonReEnter
            // ... other properties ...
        });

        await newDeliveryPerson.save();
        res.json("DeliveryPerson Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding DeliveryPerson", error: err.message });
    }
};


const getAllDeliveryPerson = async (req, res) => {
    try {
        const DeliveryPersons = await DeliveryPerson.find();
        res.json(DeliveryPersons);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPersons", error: err.message });
    }
};


const updateDeliveryPerson = async (req, res) => {
    try {
        const DeliveryPersonId = req.params.id; // Correct variable name

        const { deliverypersonname, deliverypersonContactNumber, deliverypersonEmail, deliverypersonAddress, deliverypersonDLexpire, deliverypersonVehicleType, deliverypersonVehicleNumber, deliverypersonBranch } = req.body;

        const updateDeliveryPersons = {
            deliverypersonname,
            deliverypersonContactNumber,
            deliverypersonEmail,
            deliverypersonAddress,
            deliverypersonDLexpire,
            deliverypersonVehicleType,
            deliverypersonVehicleNumber,
            deliverypersonBranch
        };

        await DeliveryPerson.findByIdAndUpdate(DeliveryPersonId, updateDeliveryPersons); // Correct variable name
        res.status(200).send({ status: "DeliveryPerson Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating DeliveryPerson", error: err.message });
    }
};


const deleteDeliveryPerson = async (req, res) => {
    try {
        const DeliveryPersonID = req.params.id;

        await DeliveryPerson.findByIdAndDelete(DeliveryPersonID);
        res.status(200).send({ status: "DeliveryPerson Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting DeliveryPerson", error: err.message });
    }
};

const getDeliveryPersonById = async (req, res) => {
    try {
        const DeliveryPersonID = req.params.id;

        const DeliveryPerson = await DeliveryPerson.findById(DeliveryPersonID);
        res.status(200).send({ status: "DeliveryPerson fetched", supplier });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPerson", error: err.message });
    }
};

module.exports = {
   addDeliveryPerson,
   getAllDeliveryPerson,
   updateDeliveryPerson,
    deleteDeliveryPerson,
    getDeliveryPersonById,
};


