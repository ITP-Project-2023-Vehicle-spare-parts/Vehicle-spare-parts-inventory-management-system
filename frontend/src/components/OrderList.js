import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderList.css'

function OrderDetails({ navigateToDeliveryPersons }) {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(loading)
  


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
<div id='OrderList'>
      <h2>Order Details</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Order ID</th>
              <th>Customer Name</th>
              <th>Shipping Address</th>
              <th>Branch</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order._id}>
                <td className="text-center">{order._id}</td>
                <td>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</td>
                <td>{`${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`}</td>
                <td>
                  {order.branch}
          </td>
                <td>
  {order.isActive && (
    <span className="success-badge" title="Active Process"></span>
  )}
  <span className={`status-badge ${order.orderStatus.toLowerCase()}-status`}>
    {order.orderStatus}
  </span>
</td>
<td>
  <a
    href={`/admin/order/${order._id}/${order.user}`}
    className="action-btn"
  >
    View Details
  </a>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
