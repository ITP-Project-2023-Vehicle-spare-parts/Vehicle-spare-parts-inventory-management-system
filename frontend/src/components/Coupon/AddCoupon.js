import React, { useState } from "react";
import axios from "axios";
import "./AddCoupon.css"; // Import your CSS file here

function AddCoupon() {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
    expirationDate: "",
    
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  console.log(errorMessage)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.code.trim() === "") {
      newErrors.code = "Code is required";
    }

    if (formData.discount.trim() === "") {
      newErrors.discount = "Discount is required";
    }

    // You can add more validation rules here if needed

    setErrors(newErrors);

    // Return true if there are no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Convert expirationDate to a Date object
        const { code, discount, description, expirationDate } = formData;
        const year = expirationDate.year;
        const month = expirationDate.month - 1; // Subtract 1 because months are 0-based
        const day = expirationDate.day;
        const expDate = new Date(year, month, day);

        // Send a POST request to your backend API
        const response = await axios.post("http://localhost:8000/coupon/addCoupon", {
          code,
          discount,
          description,
          expirationDate: expDate, // Use the Date object here
        });

        if (response.status === 201) {
          // Reset the form and show a success message
          setFormData({
            code: "",
            discount: "",
            description: "",
            expirationDate: "",
            
          });
          alert("Coupon Created successfully!");
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
    <div className="container" id="AddCoupon">
      <h2>Create Coupon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
          {errors.code && (
            <div className="error">{errors.code}</div>
          )}
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
          />
          {errors.discount && (
            <div className="error">{errors.discount}</div>
          )}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Create Coupon</button>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
