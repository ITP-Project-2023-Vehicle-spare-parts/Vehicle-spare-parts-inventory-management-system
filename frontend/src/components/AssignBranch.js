import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AssignBranch() {
  const [orderData, setOrderData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Define setLoading

  useEffect(() => {
    // Fetch data from the API endpoint for orders
    axios.get('http://localhost:8000/allOrder/allOrders')
      .then((response) => {
        setOrderData(response.data);
        setLoading(false); // Set loading to false after the request is complete
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setLoading(false); // Set loading to false if the request fails
      });
  }, []);

  // Function to handle changes in branch location
  const handleBranchLocationChange = (event, id) => {
    const selectedLocation = event.target.value;
    setSelectedBranch(selectedLocation);
  };

  // Function to display success message
  const displaySuccessMessage = () => {
    if (selectedBranch) {
      setSuccessMessage(`Branch location "${selectedBranch}" selected successfully.`);
    } else {
      setSuccessMessage('');
    }
  };

  const updateClusterDatabase = (id) => {
    console.log("Updating order with ID:", id);
    console.log("Selected branch:", selectedBranch);
    axios
      .put(`http://localhost:8000/allOrder/updateLocations/${id}`, { branch: selectedBranch })
      .then((response) => {
        alert('Branch location updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating branch location:', error);
        alert('Error updating branch location. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Order Details</h2>
      {successMessage && <p>{successMessage}</p>}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Shipping Address</th>
            <th>Order Status</th>
            <th>Branch Location</th>
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
              <td>
                <select onChange={(e) => handleBranchLocationChange(e, order._id)}>
                  <option value="jaffna">Jaffna</option>
                  <option value="ibbagamuwa_main">Ibbagamuwa Main</option>
                  <option value="galle">Galle</option>
                  <option value="colombo">Colombo</option>
                  <option value="nuwara_eliya">Nuwara Eliya</option>
                  <option value="batticaloa">Batticaloa</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <button onClick={() => updateClusterDatabase(order._id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignBranch;
