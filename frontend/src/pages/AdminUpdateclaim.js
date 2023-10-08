// AdminUpdateClaims.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminUpdateclaim() {
  const { id,billno} = useParams(); // Get the claim ID from the URL
  const [claimDetails, setClaimDetails] = useState({});
  const [newStatus, setNewStatus] = useState('');
  
  useEffect(() => {
    // Fetch claim details by ID
    const fetchClaimDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/warrenty/get/${billno}`);
        setClaimDetails(response.data.warrenty);
      } catch (error) {
        console.error('Error fetching claim details:', error);
      }
    };

    fetchClaimDetails();
  }, [billno]);

  const handleStatusChange = async () => {
    try {
      // Send a PUT request to update the claim status
      await axios.put(`http://localhost:8000/warrenty/update/${id}`, { status: newStatus });
      console.log('Claim status updated');
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'update Successful',
        showConfirmButton: false,
        timer: 1500
      })
      
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Update Claim Status</h2>
      <div>
        <p><strong>Product Name:</strong> {claimDetails.productname}</p>
        <p><strong>Bill No:</strong> {claimDetails.billno}</p>
        <p><strong>Purchase Date:</strong> {claimDetails.purchasedate}</p>
        <p><strong>Claim added Date:</strong> {claimDetails.claimdate}</p>
        <p><strong>Branch name:</strong> {claimDetails.branch}</p>
        <p><strong>Contact No:</strong> {claimDetails.contactNo}</p>     
        <p><strong>Email:</strong> {claimDetails.email}</p>
        <p><strong>Description:</strong> {claimDetails.description}</p>
        <p><strong>Status:</strong> {claimDetails.status}</p>
      </div>
      <div className="mb-3">
        <label htmlFor="newStatus">Update Status:</label>
        <select
          className="form-select"
          id="newStatus"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Not Approved">Not Approved</option>
          <option value="Under Review">Under Review</option>
        </select>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleStatusChange}
      >
        Update Status
      </button>
    </div>
  );
}

export default AdminUpdateclaim;
