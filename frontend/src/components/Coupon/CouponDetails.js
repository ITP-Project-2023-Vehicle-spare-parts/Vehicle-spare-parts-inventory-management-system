import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./CouponDetails.css";


function CouponDetails() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/coupon/get/${id}`)
      .then((response) => {
        console.log('API Response:', response.data);
        const couponData = response.data; // Update to access the entire response
        if (couponData) {
          setCoupon(couponData);
          setLoading(false);
        } else {
          setError('Coupon data not found in the API response.');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching coupon details:', error);
        setError('Error fetching coupon details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="coupon-details-container" id='CouponDetails'>Loading...</div>;
  }

  if (error) {
    return <div className="coupon-details-container error" id='CouponDetails'>{error}</div>;
  }

  if (!coupon) {
    return <div className="coupon-details-container" id='CouponDetails'>Coupon data not found.</div>;
  }

  return (
    <div className="coupon-details-container" id='CouponDetails'>
      <h2>View Coupon Details</h2>
      <p>Code: {coupon.code}</p>
      <p>Discount: {coupon.discount}</p>
      <p>Description: {coupon.description}</p>
      <p>Expiration Date: {coupon.expirationDate}</p>
    </div>
  );
}

export default CouponDetails;
