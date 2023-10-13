// TrackOrder.js

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import './TrackOrder.css';
import axios from 'axios';

const TrackOrder = () => {
  const [orderId, setSearch] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/allOrder/getOrderByID/${orderId}`);

      if (response.status === 200) {
        setOrderDetails(response.data.DeliveryOrders);
        setShowPopup(true);
      } else {
        console.error('Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div>
      <Header />
      <div id="Track-Order" className="center-container">
        <div className="search-container">
          <input
            type="search"
            value={orderId}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Your Tracking ID.........."
          />
          <button onClick={fetchOrderDetails}>Search</button>
        </div>
        {showPopup && (
          <div className="popup">
            {/* Position the popup between search bar and footer */}
            <div className="popup-content">
              {/* Display order details here */}
              <h2>Order Details</h2>
              {orderDetails ? (
                <div className="order-details-popup">
                  <p><strong>Order ID:</strong> {orderDetails._id}</p>
                  <p><strong>Order Status:</strong> {orderDetails.orderStatus}</p>
                  <p><strong>Total Price:</strong> ${orderDetails.totalPrice}</p>
                  <p><strong>Delivering Branch:</strong> {orderDetails.branch}</p>
                  <p><strong>Items:</strong></p>
                  <ul className="list-group mb-4">
                    {orderDetails.orderItems.map((item) => (
                      <li key={item._id} className="list-group-item">                         
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
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      {showPopup ? (
        <div className="spacer" style={{ height: '400px' }}></div>
      ) : null}
      <Footer />
    </div>
  );
};

export default TrackOrder;
