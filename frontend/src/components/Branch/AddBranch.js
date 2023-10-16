import React, { useState } from 'react';
import axios from 'axios';
import './AddBranch.css'; 

function AddBranch() {
  const [formData, setFormData] = useState({
    BranchID: '',
    BranchName: '',
    ManagerID: '',
    ManagerName: '',
    BranchAddress: '',
    TelePhoneNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  console.log(errorMessage)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.TelePhoneNumber.length !== 10) {
      newErrors.TelePhoneNumber = 'Telephone number must have exactly 10 numbers';
    }

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send a POST request to your backend API
        const response = await axios.post("http://localhost:8000/Branch/addBranch", formData);

        if (response.status === 200) {
          // Reset the form and show a success message
          setFormData({
            BranchID: '',
            BranchName: '',
            ManagerID: '',
            ManagerName: '',
            BranchAddress: '',
            TelePhoneNumber: '',
          });
          alert("Branch Added successfully!");
        }
} catch (error) {
  // Handle errors here
  if (error.response && error.response.data && error.response.data.error) {
    // If there is an error message in the response, set it in the state
    setErrorMessage(error.response.data.error);
    alert(`Error: ${error.response.data.error}`); // Display error message in an alert
  } else {
    // If there is no specific error message in the response, display a generic error
    console.error("Error:", error);
    alert("An error occurred while adding the branch. Please try again.");
  }
}
} else {
console.log('Form has errors. Please correct them.');
}
};

  return (
    <div className='container' id='AddBranch'>
      <h2>Add New Branch</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="BranchID">Branch ID:</label>
          <input
            type="text"
            id="BranchID"
            name="BranchID"
            value={formData.BranchID}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="BranchName">Branch Name:</label>
          <input
            type="text"
            id="BranchName"
            name="BranchName"
            value={formData.BranchName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ManagerID">Manager ID:</label>
          <input
            type="text"
            id="ManagerID"
            name="ManagerID"
            value={formData.ManagerID}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ManagerName">Manager Name:</label>
          <input
            type="text"
            id="ManagerName"
            name="ManagerName"
            value={formData.ManagerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="BranchAddress">Branch Address:</label>
          <input
            type="text"
            id="BranchAddress"
            name="BranchAddress"
            value={formData.BranchAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="TelePhoneNumber">Telephone Number:</label>
          <input
            type="text"
            id="TelePhoneNumber"
            name="TelePhoneNumber"
            value={formData.TelePhoneNumber}
            onChange={handleChange}
          />
          {errors.TelePhoneNumber && (
            <div className="error">{errors.TelePhoneNumber}</div>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddBranch;



