import React, { useState } from "react";
import axios from "axios";
import "./AddOffer.css";

const AddOffer = () => {
  const [formData, setFormData] = useState({
    productId: "",
    offerID: "",
    rate: "",
    description: "",
    startDate:  "",
    endDate: "",
    
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to control the success alert
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/Offers/addOffer",
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add Offer"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffer;
