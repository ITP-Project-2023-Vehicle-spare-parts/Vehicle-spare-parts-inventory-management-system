// OrderDetails.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetails({ navigateToDeliveryPersons }) {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API endpoint for orders
    axios.get('http://localhost:8000/allOrder/allOrders')
      .then((response) => {
        setOrderData(response.data);
        console.log(response.data)
        setLoading(false); // Set loading to false after the request is complete
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setLoading(false); // Set loading to false if the request fails
      });
  }, []);



  return (
    <div>
      <h2>Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Shipping Address</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
    
            <tr key={order._id}>
              
              <td>{order._id}</td>
              <td>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</td>
              <td>{`${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`}</td>
              <td>{order.orderStatus}</td>
              
              <Link to={"/order/"+order._id+  "/" +order.user}>
                      View Details
                    </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetails;
