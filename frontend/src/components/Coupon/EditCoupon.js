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

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      expirationDate: {
        ...prevCoupon.expirationDate,
        [name]: value,
      },
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
          <label>Expiration Date:</label>
          <div>
            <select
              name="year"
              value={coupon.expirationDate.year}
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
              value={coupon.expirationDate.month}
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
              value={coupon.expirationDate.day}
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
        <div className="button-container">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditCoupon;
