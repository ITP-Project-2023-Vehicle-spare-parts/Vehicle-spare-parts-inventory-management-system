// controllers/deliveringOrderController.js
const DeliveringOrder = require('../model/deliveringOrderModel');
const Order = require('../model/orderModel');
const DeliveryPerson = require('../model/deliverypersonModel');
const User = require('../model/userModel');

const getDeliveredOrders = async (req, res) => {
  try {
    const deliveredOrders = await DeliveringOrder.find()
    // { orderStatus: 'Delivered' }
      .populate('deliveryPersonID', 'deliveryPersonName')
      .populate('userID', 'username');

    res.status(200).json(deliveredOrders);
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getDeliveredOrders
};
