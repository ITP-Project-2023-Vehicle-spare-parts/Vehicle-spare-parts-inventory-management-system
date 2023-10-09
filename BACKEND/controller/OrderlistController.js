const Order = require('../model/orderModel');

const getAllOrders = async (req, res) => {
    try {
        const DeliveryOrder = await Order.find({ orderStatus: "Billed" });
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
        const assignBranch = await Order.find({ orderStatus: "Ordered" });
        //{ branch: "Not Assign" }
         //{ branch: { $nin: ["Not Assign", "Not Assigned"] } }

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

const updateDeliveryPersonID = async (req, res) => {
    try {
        const OrderID = req.params.orderid;
        console.log(req.body); // Correct variable name

        const { deliveryPersonid  } = req.body;
        console.log(req.params.orderid);
        const updateDeliveryPersonID = {
            
            deliveryPersonid
        };

        await Order.findByIdAndUpdate(req.params.orderid , updateDeliveryPersonID); // Correct variable name
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


        const { billNumber,billedDate,billExpiredDate,branch, orderStatus } = req.body;
        const updateBranchLocations = {
            billNumber,
            billedDate,
            billExpiredDate,
            branch,
            orderStatus
        };

        await Order.findByIdAndUpdate(req.params.orderid , updateBranchLocations ); // Correct variable name
        res.status(200).send({ status: "Bill details Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error updating bill details", error: err.message });
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

  const getOrdersByBranch = async (req, res) => {
    try {
        const ordersByBranch = await Order.aggregate([
            {
                $group: {
                    _id: "$branch",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.json(ordersByBranch);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching orders by branch", error: err.message });
    }
};
const getAllOrdersForDeliveryPerson = async (req, res) => {
    try {
        const DeliveryOrderes = await Order.find({ orderStatus: "delivery person assign" });
        //{ orderStatus: "Ordered" }
        res.json(DeliveryOrderes);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching DeliveryOrder", error: err.message });
    }
};

const getOrdersByDeliveryPersonId = async (req, res) => {
    try {
      const deliveryPersonId = req.params.id; // Assuming this is the delivery person's ID
      console.log(req.params.id);
  
      // Use find instead of findById to find orders with the given delivery person ID
      const deliveryOrders = await Order.find({ deliveryPersonid: deliveryPersonId });
  
      if (!deliveryOrders || deliveryOrders.length === 0) {
        return res.status(404).send({ status: "Orders not found for the given delivery person ID" });
      }
  
      console.log(deliveryOrders);
      res.status(200).send({ status: "Orders fetched", deliveryOrders });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error fetching orders", error: err.message });
    }
  };

  const getOrdersByMonth = async (req, res) => {
    try {
      const ordersByMonth = await Order.aggregate([
        {
          $match: {
            orderStatus: "Delivered",
            billedDate: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
            }
          }
        },
        {
          $group: {
            _id: {
              month: { $month: "$billedDate" },
              year: { $year: "$billedDate" }
            },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1
          }
        }
        // Your additional aggregation stages go here
      ]);
  
      console.log('Orders by month:', ordersByMonth);
  
      const formattedOrders = ordersByMonth.map(item => {
        const { _id, count } = item;
  
        if (_id && _id.year !== undefined && _id.month !== undefined) {
          const monthYear = `${_id.month}/${_id.year}`;
          return {
            monthYear,
            count
          };
        } else {
          console.log('Invalid _id structure:', _id);
          return null;
        }
      });
  
      const validOrders = formattedOrders.filter(order => order !== null);
  
      console.log('Valid formatted data for chart:', validOrders);
  
      res.json(validOrders);
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: 'Error fetching orders by month', error: err.message });
    }
  };
  
  module.exports = {
    getOrdersByMonth
  };
  
  
  
  
   

module.exports = {
    getAllOrders,
    updateOrderStatus,
    updateBranchLocation,
    getOrderById,
    getOrders,
    getOrderHistory,
    updateDeliveryPersonID,
    getOrdersByBranch,
    getAllOrdersForDeliveryPerson,
    getOrdersByDeliveryPersonId,
    getOrdersByMonth

 };