// const DeliveringOrder = require('../model/deliveringOrderModel');

// const addDeliveryOrder = async (req, res) => {
//     try {
//         const existingDeliveryOrder = await DeliveringOrder.findOne({ OrderID: req.body.OrderID });

//         if (existingDeliveryOrder) {
//             return res.status(400).json({ status: "Error", error: "Havent order with this order ID" });
//         }

//         // Use a different variable name (e.g., newDeliveryPerson) for the instance
//         const newDeliveryOrder = new DeliveryOrder({
//             OrderID: req.body.OrderID,
//             DeliveryPersonID: req.body.DeliveryPersonID,
//             orderDetails: req.body.orderDetails,
//             customername : req.body.customername,
//             deliverypersonContactNumber : req.body.deliverypersonContactNumber,
//             branch : req.body.branch,
//             CustomercontactNumber : req.body.CustomercontactNumber,
//             deliverypersonVehicleNumber : req.body.deliverypersonVehicleNumber,
//             CustomerAddress : req.body.CustomerAddress,
//             deliverypersonUsername : req.body.deliverypersonUsername,
//             orderStatus : req.body.orderStatus
//             // ... other properties ...
//         });

//         await newDeliveryOrder.save();
//         res.json("DeliveryOrder Added");
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error adding DeliveryOrder", error: err.message });
//     }
// };
const DeliveringOrder = require('../model/deliveringOrderModel');

const addDeliveryOrder = async (req, res) => {
    try {
        const existingDeliveryOrder = await DeliveringOrder.findOne({ OrderID: req.body.OrderID });

        if (existingDeliveryOrder) {
            return res.status(400).json({ status: "Error", error: "Havent order with this order ID" });
        }

        // Use a different variable name (e.g., newDeliveryOrder) for the instance
        const newDeliveryOrder = new DeliveringOrder({
            OrderID: req.body.OrderID,
            DeliveryPersonID: req.body.DeliveryPersonID,
            orderDetails: req.body.orderDetails,
            customername: req.body.customername,
            deliverypersonContactNumber: req.body.deliverypersonContactNumber,
            branch: req.body.branch,
            CustomercontactNumber: req.body.CustomercontactNumber,
            deliverypersonVehicleNumber: req.body.deliverypersonVehicleNumber,
            CustomerAddress: req.body.CustomerAddress,
            deliverypersonUsername: req.body.deliverypersonUsername,
            orderStatus: req.body.orderStatus
            // ... other properties ...
        });

        await newDeliveryOrder.save();
        res.json("DeliveryOrder Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error adding DeliveryOrder", error: err.message });
    }
};


const getAllDeliveryOrder = async (req, res) => {
    try {
        const DeliveryOrders = await DeliveringOrder.find();
        res.json(DeliveryOrders);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryOrders", error: err.message });
    }
};

const updateDelivertOrder = async (req, res) => {
    try {
        const OrderID = req.params.id; // Correct variable name

        const { DeliveryPersonID, orderStatus } = req.body;

        const updateDeliveryOrders = {
            DeliveryPersonID,
            orderStatus
        };

        await DeliveringOrder.findByIdAndUpdate(OrderID, updateDeliveryOrders); // Correct variable name
        res.status(200).send({ status: "DeliveryOrder Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating DeliveryOrder", error: err.message });
    }
};


// const deleteDeliveryOrder = async (req, res) => {
//     try {
//         const DeliveryPersonID = req.params.id;

//         await DeliveryPerson.findByIdAndDelete(DeliveryPersonID);
//         res.status(200).send({ status: "DeliveryPerson Deleted" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ status: "Error deleting DeliveryPerson", error: err.message });
//     }
// };

const getDeliveryOrderById = async (req, res) => {
    try {
        const OrderID = req.params.id;

        const DeliveringOrder = await DeliveringOrder.findById(OrderID);
        res.status(200).send({ status: "DeliveringOrder fetched", supplier });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveringOrder", error: err.message });
    }
};

module.exports = {
    addDeliveryOrder,
    getAllDeliveryOrder,
    updateDelivertOrder,
    getDeliveryOrderById,
 };