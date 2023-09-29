const Order = require('../model/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const DeliveryOrder = await Order.find();
        //{ orderStatus: "Ordered" }
        res.json(DeliveryOrder);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryOrder", error: err.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const OrderID = req.params.orderid;
        console.log(req.body); // Correct variable name

        const { orderStatus  } = req.body;
        console.log(req.params.orderid);
        const updateOrderStatuses = {
            
            orderStatus
        };

        await Order.findByIdAndUpdate(req.params.orderid , updateOrderStatuses); // Correct variable name
        res.status(200).send({ status: "Order status Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating Order status", error: err.message });
    }
};

const updateBranchLocation = async (req, res) => {
    try {
        const OrderID = req.params.id;
        // Inside your route handler
        console.log("Received PUT request with data:", req.body);


        const { branch } = req.body;
        const updateBranchLocations = {
            
            branch
        };

        await Order.findByIdAndUpdate(req.params.orderid , updateBranchLocations ); // Correct variable name
        res.status(200).send({ status: "Branch Location Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating branch location", error: err.message });
    }
};
  

module.exports = {
    getAllOrders,
    updateOrderStatus,
    updateBranchLocation
 };