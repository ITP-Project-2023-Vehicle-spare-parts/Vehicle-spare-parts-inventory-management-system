const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for the Order model
const orderStockSchema = new Schema({
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier', // Reference to the Supplier model
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantityOrdered: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields here, such as order status, tracking information, etc.
});

// Create the Order model using the schema
const OrderStock = mongoose.model('Order', orderStockSchema);

module.exports = OrderStock;
