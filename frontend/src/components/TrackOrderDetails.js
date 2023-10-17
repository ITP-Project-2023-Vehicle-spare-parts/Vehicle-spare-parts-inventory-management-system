// TrackOrderDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './TrackOrderDetails.css';

const TrackOrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/allOrder/getOrderByID/${orderId}`);

        if (response.status === 200) {
          setOrderDetails(response.data.DeliveryOrders);
        } else {
          console.error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      <Header />
      <div id='TrackOrderDetails' className="container mt-4">
        {orderDetails ? (
          <div className="order-details">
            <h2 className="mb-4">Order Details</h2>
            <p><strong>Order ID:</strong> {orderDetails._id}</p>
            <p><strong>User ID:</strong> {orderDetails.user}</p>
            <p><strong>Order Status:</strong> {orderDetails.orderStatus}</p>
            <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-group mb-4">
              {orderDetails.orderItems.map((item) => (
                <li key={item._id} className="list-group-item">
                  <strong>Product:</strong> {item.product}, 
                  <strong>Color:</strong> {item.color}, 
                  <strong>Quantity:</strong> {item.quantity}, 
                  <strong>Price:</strong> ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrderDetails;
