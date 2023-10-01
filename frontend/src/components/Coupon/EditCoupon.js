import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./EditCoupon.css";

function EditCoupon() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState({
    code: '',
    discount: '',
    description: '',
    expirationDate: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/coupon/get/${id}`)
      .then((response) => {
        const couponData = response.data;
        if (couponData && couponData.code) {
          setCoupon(couponData);
        } else {
          setError('Coupon data not found in the API response.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching coupon details:', error);
        setError('Error fetching coupon details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/coupon/update/${id}`, coupon)
      .then((response) => {
        alert('Coupon updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating coupon:', error);
        alert('Error updating coupon. Please try again later.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-coupon-container" id='EditCoupon'>
      <h2>Edit Coupon Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for other properties */}
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={coupon.code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={coupon.discount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={coupon.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={coupon.expirationDate}
            onChange={handleInputChange}
          />

        </div>
        <div className="button-container">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditCoupon;
