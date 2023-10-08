import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditBranch.css';

function EditBranch() {
  const { id } = useParams();
  const [branch, setBranch] = useState({
    BranchID: '',
    BranchName: '',
    ManagerID: '',
    ManagerName: '',
    BranchAddress: '',
    TelePhoneNumber: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/Branch/get/${id}`)
      .then((response) => {
        const data = response.data;
        if (data && data.branch && data.branch.BranchID) {
          setBranch(data.branch); // Update to use data.branch
        } else {
          console.error('API Response:', data);
          setError('Branch data not found in the API response.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching branch data.');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranch((prevBranch) => ({
      ...prevBranch,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/Branch/update/${id}`, branch)
      .then((response) => {
        alert('Branch updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating branch:', error);
        alert('Error updating branch. Please try again later.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  

  return (
    <div className='edit-branch-container' id='EditBranch'>
      <h2>Edit Branch Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for other branch properties */}
        {/* <div>
          <label htmlFor="BranchID">Branch ID:</label>
          <input
            type="text"
            id="BranchID"
            name="BranchID"
            value={branch.BranchID}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
          <label htmlFor="BranchName">Branch Name:</label>
          <input
            type="text"
            id="BranchName"
            name="BranchName"
            value={branch.BranchName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ManagerID">Manager ID:</label>
          <input
            type="text"
            id="ManagerID"
            name="ManagerID"
            value={branch.ManagerID}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="ManagerName">Manager Name:</label>
          <input
            type="text"
            id="ManagerName"
            name="ManagerName"
            value={branch.ManagerName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="BranchAddress">Branch Address:</label>
          <input
            type="text"
            id="BranchAddress"
            name="BranchAddress"
            value={branch.BranchAddress}
            onChange={handleInputChange}
          />
        </div>
        <div></div>
        {/* Add other input fields for branch properties */}
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditBranch;
