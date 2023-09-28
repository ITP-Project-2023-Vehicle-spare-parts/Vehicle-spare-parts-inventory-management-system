import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OfferDetails.css';

function OfferDetails() {
  const { offerID } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/offers/getOffer/${offerID}`)
      .then((response) => {
        const offerData = response.data;
        console.log("Offer Data:", offerData); // Log the entire offer object
        setOffer(offerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching offer details:', error);
        setLoading(false);
      });
  }, [offerID]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!offer) {
    return <div>Error retrieving offer details.</div>;
  }

  const productId = offer.productID;
if (!productId) {
  return <div>Product ID not found.</div>;
}

  return (
    <div className='offer-details-container'id='OfferDetails'>
      <h2>Offer Details</h2>
      <p>Product ID: {offer.productID._id}</p>

      <p>Offer ID: {offer.offerID}</p>
      <p>Rate: {offer.rate}</p>
      <p>Description: {offer.description}</p>
      {/* Add other fields as needed */}
    </div>
  );
}

export default OfferDetails;
