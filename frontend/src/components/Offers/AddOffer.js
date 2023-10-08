import React, { useState } from 'react';
import axios from 'axios';
import './AddOffer.css'; // Import your CSS file here

function AddOffer() {
  const [formData, setFormData] = useState({
    productId: "",
        offerID: "",
        rate: "",
        description: "",
        startDate:  "",
        endDate: "",
  });

  const [errors, setErrors] = useState({});
  console.log(errors)
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

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Send a POST request to your backend API
        const response = await axios.post("http://localhost:8000/Offers/addOffer", formData);

        if (response.status === 200) {
          // Reset the form and show a success message
          setFormData({
            productId: '',
            offerID: '',
            rate: '',
            description: '',
            startDate:  '',
            endDate: '',
          });
          alert("Offer Added successfully!");
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
        <div className="container" id="AddOffer">
          <h2>Add New Offer</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="productId">Product ID:</label>
              <input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="offerID">Offer ID:</label>
              <input
                type="text"
                id="offerID"
                name="offerID"
                value={formData.offerID}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="rate">Rate:</label>
              <input
                type="text"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              </div>
              <div>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
              </div>
            <div>
            <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
    };

   export default AddOffer;