const Order = require('../model/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const DeliveryOrder = await Order.find({ orderStatus: "Ordered" });
        //{ orderStatus: "Ordered" }
        res.json(DeliveryOrder);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryOrder", error: err.message });
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const DeliveryOrderes = await Order.find({ orderStatus: "Delivered" });
        //{ orderStatus: "Delivered" }
        res.json(DeliveryOrderes);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching Order history", error: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const assignBranch = await Order.find();
        //{ branch: "Not Assign" }

        res.json(assignBranch);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching assign Branch", error: err.message });
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


const getOrderById = async (req, res) => {
    try {
      const DeliveringID = req.params.id;
      console.log(req.params.id);
  
      const DeliveryOrders = await Order.findById(req.params.id);
  
      if (!DeliveryOrders) {
        return res.status(404).send({ status: "Order not found" });
      }
  
      console.log(DeliveryOrders);
      res.status(200).send({ status: "Order fetched", DeliveryOrders });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error fetching order", error: err.message });
    }
  };
  

  

module.exports = {
    getAllOrders,
    updateOrderStatus,
    updateBranchLocation,
    getOrderById,
    getOrders,
    getOrderHistory

 };