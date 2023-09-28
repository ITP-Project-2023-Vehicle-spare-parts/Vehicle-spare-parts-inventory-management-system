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
    startDate: {
      year: '',
      month: '',
      day: '',
    },
    endDate: {
      year: '',
      month: '',
      day: '',
    },
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

  const handleDateChange = (dateType, e) => {
    const { name, value } = e.target;
    setOffer({
      ...offer,
      [dateType]: {
        ...offer[dateType],
        [name]: value,
      },
    });
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
          <label>Start Date:</label>
          <div>
            <select
              name="year"
              value={offer.startDate.year}
              onChange={(e) => handleDateChange('startDate', e)}
            >
              <option value="">Year</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={offer.startDate.month}
              onChange={(e) => handleDateChange('startDate', e)}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={offer.startDate.day}
              onChange={(e) => handleDateChange('startDate', e)}
            >
              <option value="">Day</option>
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
              value={offer.endDate.year}
              onChange={(e) => handleDateChange('endDate', e)}
            >
              <option value="">Year</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={offer.endDate.month}
              onChange={(e) => handleDateChange('endDate', e)}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="day"
              value={offer.endDate.day}
              onChange={(e) => handleDateChange('endDate', e)}
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditOffer;
