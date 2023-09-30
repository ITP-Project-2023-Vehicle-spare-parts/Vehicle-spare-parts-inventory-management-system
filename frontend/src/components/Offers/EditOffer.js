// EditOffer.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditOffer.css';

function EditOffer() {
  const { id } = useParams();
  const [offer, setOffer] = useState({
    productId: '',
    offerID: '',
    rate: '',
    description: '',
    startDate: '',
    endDate: '',
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
     axios
       .get(`http://localhost:8000/Offers/get/${id}`)
       .then((response) => {
         console.log('API Response:', response.data);
         const data = response.data;
        
         if (data.status === 'Offer fetched' && data.offer) { // Check if data.status and data.offer exist
           setOffer(data.offer);
         } else {
           setError('Offer data not found in the API response.');
         }
         setLoading(false);
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
         setError('Error fetching offer data.');
         setLoading(false);
       });
   }, [id]);
  


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/Offers/update/${id}`, offer)
      .then((response) => {
        alert('Offer updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating offer:', error);
        alert('Error updating offer. Please try again later.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-offer-container" id='EditOffer'>
      <h2>Edit Offer Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="offerID">Offer ID:</label>
          <input
            type="text"
            id="offerID"
            name="offerID"
            value={offer.offerID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rate">Rate:</label>
          <input
            type="text"
            id="rate"
            name="rate"
            value={offer.rate}
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
            value={offer.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
        <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={offer.startDate}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
        <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={offer.endDate}
            onChange={handleInputChange}
            required
            />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditOffer;
