import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BranchDetails.css';

function BranchDetails() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/Branch/get/${id}`)
      .then((response) => {
        const branchData = response.data.branch; // Assuming the API returns an object with a "branch" key
        setBranch(branchData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching branch details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!branch) {
    return <div>Error retrieving branch details.</div>;
  }

  return (
    <div className='branch-details-container' id='BranchDetails'>
      <h2>View Branch Details</h2>
      <p>Branch ID: {branch.BranchID}</p>
      <p>Branch Name: {branch.BranchName}</p>
      <p>Manager ID: {branch.ManagerID}</p>
      <p>Manager Name: {branch.ManagerName}</p>
      <p>Branch Address: {branch.BranchAddress}</p>
      <p>Telephone Number: {branch.TelePhoneNumber}</p>
    </div>
  );
}

export default BranchDetails;
