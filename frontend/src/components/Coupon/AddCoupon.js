import React, { useState } from "react";
import axios from "axios";
import "./AddCoupon.css"; // Import your CSS file here

function AddCoupon() {
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
    expirationDate: {
      year: "",
      month: "",
      day: "",
    },
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      expirationDate: {
        ...formData.expirationDate,
        [name]: value,
      },
    });
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
            expirationDate: {
              year: "",
              month: "",
              day: "",
            },
          });
          alert("Coupon Created successfully!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the coupon. Please try again.");
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
          <label>Expiration Date:</label>
          <div>
            <select
              name="year"
              value={formData.expirationDate.year}
              onChange={handleDateChange}
              required
            >
              <option value="">Year</option>
              {/* Generate options for years */}
              {/* Example: Generate options for the next 10 years */}
              {Array.from({ length: 10 }, (_, i) => (
                <option
                  key={i}
                  value={new Date().getFullYear() + i}
                >
                  {new Date().getFullYear() + i}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.expirationDate.month}
              onChange={handleDateChange}
              required
            >
              <option value="">Month</option>
              {/* Generate options for months */}
              {/* Example: Generate options for months 1-12 */}
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={formData.expirationDate.day}
              onChange={handleDateChange}
              required
            >
              <option value="">Day</option>
              {/* Generate options for days */}
              {/* Example: Generate options for days 1-31 */}
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button type="submit">Create Coupon</button>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
