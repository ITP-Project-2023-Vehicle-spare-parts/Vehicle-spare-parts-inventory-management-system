// OrderDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails, getDeliveryPersonDetails } from './api';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await getOrderDetails(orderId);
        const deliveryPerson = await getDeliveryPersonDetails(order.deliveryPersonID);

        setOrderDetails({ order, deliveryPerson });
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      {orderDetails ? (
        <>
          <h2>Order Details</h2>
          <p>Order ID: {orderDetails.order._id}</p>
          <p>Order Status: {orderDetails.order.orderStatus}</p>
          <p>Total Price: ${orderDetails.order.totalPrice}</p>
          <p>Items:</p>
          <ul>
            {orderDetails.order.orderItems.map((item) => (
              <li key={item._id}>
                Product: {item.product}, Color: {item.color}, Quantity: {item.quantity}, Price: ${item.price}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default OrderDetails;
