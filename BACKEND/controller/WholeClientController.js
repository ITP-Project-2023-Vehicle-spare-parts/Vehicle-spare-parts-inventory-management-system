const Clients = require("../model/WholeClientModel");

const addClients = async (req, res) => {
    try {

        const existingClient = await Supplier.findOne({ SystemEmail: req.body.SystemEmail });

        if (existingClient) {
            return res.status(400).json({ status: "Error", error: "Client with this email already exists" });
        }
    
    const ClientsfirstName = req.body.ClientsfirstName;
    const ClientsLastName = req.body.ClientsLastName;
    const ClientsFullName = req.body.ClientsFullName;
    const ClientsAge = req.body.ClientsAge;
    const ClientsGender = req.body.ClientsGender;
    const ClientsEmail = req.body.ClientsEmail;
    const ClientsPhone = req.body.ClientsPhone;
    const ClientsAddress = req.body.ClientsAddress ;
    const ClientsStatus= req.body.ClientsStatus;
    const SystemEmail= req.body.SystemEmail;
    const SystemPassword= req.body.SystemPassword;

        const newClients = new Clients({
         
            ClientsfirstName ,
            ClientsLastName ,
            ClientsFullName,
            ClientsAge ,
            ClientsGender,
            ClientsEmail ,
            ClientsPhone ,
            ClientsAddress,
            ClientsStatus,
            SystemEmail,
            SystemPassword,
        });

        await newClients.save();
        res.json("Clients Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding Clients", error: err.message });
    }
};

const getAllClients = async (req, res) => {
    try {
        const clients = await Clients.find();
        res.json(clients);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Clients", error: err.message });
    }
};

const updateClients = async (req, res) => {
    try {
        const ClientsId = req.params.id;

        const { ClientsfirstName , ClientsLastName , ClientsAge, ClientsGender, ClientsEmail, ClientsPhone,ClientsAddress, SystemPassword,} = req.body;


        const updateClients = {
            ClientsfirstName ,
            ClientsLastName ,
            ClientsAge ,
            ClientsGender,
            ClientsEmail ,
            ClientsPhone ,
            ClientsAddress,
            SystemPassword,
        };

        await Clients.findByIdAndUpdate(ClientsId, updateClients);
        res.status(200).send({ status: "Clients Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating Clients", error: err.message });
    }
};

const deleteClients = async (req, res) => {
    try {
        const ClientsId = req.params.id;

        await Clients.findByIdAndDelete(ClientsId);
        res.status(200).send({ status: "Clients Deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error deleting Clients", error: err.message });
    }
};

const getClientsById = async (req, res) => {
    try {
        const ClientsId = req.params.id;

        const clients = await Clients.findById(ClientsId);
        res.status(200).send({ status: "Clients fetched", clients });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Clients", error: err.message });
    }
};

module.exports = {
    addClients,
    getAllClients,
    updateClients,
    deleteClients,
    getClientsById,
};
