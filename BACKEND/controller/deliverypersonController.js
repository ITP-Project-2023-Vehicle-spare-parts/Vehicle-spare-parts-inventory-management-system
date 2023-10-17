const DeliveryPerson = require('../model/deliverypersonModel');




const addDeliveryPerson = async (req, res) => {
    try {
        const existingDeliveryPerson = await DeliveryPerson.findOne({ deliverypersonUsername: req.body.deliverypersonUsername });

        if (existingDeliveryPerson) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this username already exists" });
        }

        const existingEmail = await DeliveryPerson.findOne({ deliverypersonEmail: req.body.deliverypersonEmail });
        if (existingEmail) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this email already exists" });
        }

        const existingID = await DeliveryPerson.findOne({ DeliveryPersonID: req.body.DeliveryPersonID });
        if (existingID) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this ID already exists" });
        }

        const existingContactNumber = await DeliveryPerson.findOne({ deliverypersonContactNumber: req.body.deliverypersonContactNumber });
        if (existingContactNumber) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this Contact Number already exists" });
        }

        const existingNIC = await DeliveryPerson.findOne({ deliverypersonNIC: req.body.deliverypersonNIC });
        if (existingNIC) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this NIC already exists" });
        }

        const existingDLN = await DeliveryPerson.findOne({ deliverypersonDLN: req.body.deliverypersonDLN });
        if (existingDLN) {
            return res.status(400).json({ status: "Error", error: "DeliveryPerson with this DLN already exists" });
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
            deliverypersonReEnter: req.body.deliverypersonReEnter,
            imageUrl: req.body.imageUrl,
            // ... other properties ...
        });

        await newDeliveryPerson.save();
        res.json("DeliveryPerson Added");
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error, check which key violated the constraint
            if (err.keyPattern.deliverypersonUsername) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this username already exists" });
            } else if (err.keyPattern.deliverypersonEmail) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this email already exists" });
            } else if (err.keyPattern.DeliveryPersonID) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this ID already exists" });
            } 
            else if (err.keyPattern.deliverypersonContactNumber) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this Contact Number already exists" });
            }
            else if (err.keyPattern.deliverypersonDLN) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this NIC already exists" });
            }
            else if (err.keyPattern.deliverypersonNIC) {
                return res.status(400).json({ status: "Error", error: "DeliveryPerson with this DLN already exists" });
            }
        }
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
        const DeliveryPersonId = req.params.id;
        console.log(req.body); // Correct variable name

        const { deliverypersonname, deliverypersonContactNumber, deliverypersonEmail, deliverypersonAddress, deliverypersonDLexpire, deliverypersonVehicleType, deliverypersonVehicleNumber, deliverypersonBranch , personStatus} = req.body;
        console.log(req.params.id);
        const updateDeliveryPersons = {
            deliverypersonname,
            deliverypersonContactNumber,
            deliverypersonEmail,
            deliverypersonAddress,
            deliverypersonDLexpire,
            deliverypersonVehicleType,
            deliverypersonVehicleNumber,
            deliverypersonBranch,
            personStatus
        };

        await DeliveryPerson.findByIdAndUpdate(req.params.id , updateDeliveryPersons); // Correct variable name
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

const getDeliveryPerson = async (req, res) => {
    try {
        const DeliveryPersonID = req.params.id;
        console.log(req.params.id);

        const DeliveryPersons = await DeliveryPerson.findOne({ DeliveryPersonID: req.params.id });
        console.log(DeliveryPersons)
        res.status(200).send({ status: "DeliveryPerson fetched", DeliveryPersons });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPerson", error: err.message });
    }
};

const getDeliveryPersonById = async (req, res) => {
    try {
        const DeliveryPersonID = req.params.id;
        console.log(req.params.id);

        const DeliveryPersons = await DeliveryPerson.findById(req.params.id );
        console.log(DeliveryPersons)
        res.status(200).send({ status: "DeliveryPerson fetched", DeliveryPersons });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPerson", error: err.message });
    }
};

const getDeliveryPersonByMail = async (req, res) => {
    try {
        const deliveryPersonEmail = req.params.email; // Assuming you have email as a route parameter
        console.log(req.params.email);

        const deliveryPerson = await DeliveryPerson.findOne({ deliverypersonEmail: deliveryPersonEmail });
        console.log(deliveryPerson);

        if (!deliveryPerson) {
            return res.status(404).send({ status: "DeliveryPerson not found" });
        }

        res.status(200).send({ status: "DeliveryPerson fetched", deliveryPerson });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPerson", error: err.message });
    }
};

const getAllDeliveryPersonForOrder = async (req, res) => {
    try {
        const DeliveryPersons = await DeliveryPerson.find({ personStatus: "available" });
        res.json(DeliveryPersons);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryPersons", error: err.message });
    }
};


module.exports = {
   addDeliveryPerson,
   getAllDeliveryPerson,
   updateDeliveryPerson,
    deleteDeliveryPerson,
    getDeliveryPersonById,
    getDeliveryPerson,
    getDeliveryPersonByMail,
    getAllDeliveryPersonForOrder
};


