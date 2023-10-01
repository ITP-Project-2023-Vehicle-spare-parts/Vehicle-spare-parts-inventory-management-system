import React, { useState, useEffect } from "react";
import axios from "axios";
import './AssignBranch.css'; // Import your CSS file here

function AssignBranch() {
  const [orderData, setOrderData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    // Fetch data from the API endpoint for orders
    axios
      .get("http://localhost:8000/allOrder/branchAdding")
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  // Function to handle changes in branch location
  const handleBranchLocationChange = (event, id) => {
    const selectedLocation = event.target.value;
    setSelectedBranch(selectedLocation);
  };

  const updateClusterDatabase = (id) => {
    console.log("Updating order with ID:", id);
    console.log("Selected branch:", selectedBranch);
    axios
      .put(`http://localhost:8000/allOrder/updateLocations/${id}`, {
        branch: selectedBranch,
      })
      .then((response) => {
        alert("Branch location updated successfully!");
        // Disable the button for the updated order
        setDisabledButtons((prevDisabledButtons) => ({
          ...prevDisabledButtons,
          [id]: true,
        }));
      })
      .catch((error) => {
        console.error("Error updating branch location:", error);
        alert("Error updating branch location. Please try again later.");
      });
  };

  return (
    <div id="AssignBranch">
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
                <select
                  onChange={(e) => handleBranchLocationChange(e, order._id)}
                  disabled={disabledButtons[order._id]} // Disable the dropdown if branch is selected
                >
                  <option value="Not Assign">Not Assign</option>
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
                <button
                  onClick={() => updateClusterDatabase(order._id)}
                  disabled={disabledButtons[order._id]} // Disable the button if branch is selected
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignBranch;
