import React, { useState, useEffect } from "react";
import axios from "axios";
import './AssignBranch.css'; 

function AssignBranch() {
  const [orderData, setOrderData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    
    axios
      .get("http://localhost:8000/allOrder/branchAdding")
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);


  const updateClusterDatabase = (id) => {
    console.log("Updating order with ID:", id);
    console.log("Selected branch:", selectedBranch);
    axios
      .put(`http://localhost:8000/allOrder/updateLocations/${id}`, {
        branch: selectedBranch,
      })
      .then((response) => {
        alert("Branch location updated successfully!");
        
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
            {/* <th>Order ID</th> */}
            <th>Customer Name</th>
            <th>Shipping Address</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order._id}>
              {/* <td>{order._id}</td> */}
              <td>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</td>
              <td>{`${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`}</td>
              <td>{order.orderStatus}</td>
              <td>
                <a
                     href={`/admin/billAssign/${order._id}`}
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
  );
}

export default AssignBranch;
