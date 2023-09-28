import React, { useState } from "react";
import axios from "axios";
import "./AddOffer.css";

const AddOffer = () => {
  const [formData, setFormData] = useState({
    productId: "",
    offerID: "",
    rate: "",
    description: "",
    startDate: {
      year: "",
      month: "",
      day: "",
    },
    endDate: {
      year: "",
      month: "",
      day: "",
    },
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to control the success alert
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (dateType, e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [dateType]: {
        ...formData[dateType],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    setIsSubmitting(true);

    try {
      // Convert formData to the format you need for the API request
      const formattedData = {
        ...formData,
        startDate: new Date(
          formData.startDate.year,
          formData.startDate.month - 1, // Month is 0-indexed
          formData.startDate.day
        ),
        endDate: new Date(
          formData.endDate.year,
          formData.endDate.month - 1,
          formData.endDate.day
        ),
      };

      const response = await axios.post(
        "http://localhost:8000/Offers/addOffer",
        formattedData
      );

      if (response.status === 200) {
        setShowSuccessAlert(true); // Set the flag to show the success alert
        // Clear the form or perform any other desired actions

        // Re-enable the submit button after a successful submission
        setIsSubmitting(false);
      } else {
        console.error("Error adding offer");
        setIsSubmitting(false); // Re-enable the submit button on error
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false); // Re-enable the submit button on error
    }
  };

  return (
    <div className="container" id="AddOffer">
      <h2>Add Offer</h2>
      {showSuccessAlert && (
        <div className="alert alert-success" id="AddOffer" role="alert">
          Offer Added Successfully!
        </div>
      )}
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
          <label>Start Date:</label>
          <div>
            <select
              name="year"
              value={formData.startDate.year}
              onChange={(e) => handleDateChange("startDate", e)}
              required
            >
              <option value="">Year</option>
              {/* Add options for years */}
              {/* Example: Generate options for the last 10 years */}
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.startDate.month}
              onChange={(e) => handleDateChange("startDate", e)}
              required
            >
              <option value="">Month</option>
              {/* Add options for months */}
              {/* Example: Generate options for months 1-12 */}
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={formData.startDate.day}
              onChange={(e) => handleDateChange("startDate", e)}
              required
            >
              <option value="">Day</option>
              {/* Add options for days */}
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
          <label>End Date:</label>
          <div>
            <select
              name="year"
              value={formData.endDate.year}
              onChange={(e) => handleDateChange("endDate", e)}
              required
            >
              <option value="">Year</option>
              {/* Add options for years */}
              {/* Example: Generate options for the last 10 years */}
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.endDate.month}
              onChange={(e) => handleDateChange("endDate", e)}
              required
            >
              <option value="">Month</option>
              {/* Add options for months */}
              {/* Example: Generate options for months 1-12 */}
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={formData.endDate.day}
              onChange={(e) => handleDateChange("endDate", e)}
              required
            >
              <option value="">Day</option>
              {/* Add options for days */}
              {/* Example: Generate options for days 1-31 */}
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Offer"}
        </button>
      </form>
    </div>
  );
};

export default AddOffer;
