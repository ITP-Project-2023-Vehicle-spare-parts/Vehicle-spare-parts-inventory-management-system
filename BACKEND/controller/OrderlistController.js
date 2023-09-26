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

module.exports = {
    getAllOrders,
    updateOrderStatus
 };