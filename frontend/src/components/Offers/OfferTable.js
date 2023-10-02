import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './OfferTable.css';

function OfferTable() {
  const [offers, setOffers] = useState([]); // State for storing the list of offers
  const { id } = useParams(); // Assuming you're using React Router for routing

  useEffect(() => {
    // Fetch the list of offers from your API when the component mounts
    axios.get('http://localhost:8000/Offers/')
      .then((response) => {
        setOffers(response.data); // Set the offers in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleDelete = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this offer?');
  
    if (isConfirmed) {
      // Send a DELETE request to your API endpoint
      axios.delete("http://localhost:8000/Offers/delete/" + id)
        .then((response) => {
          
            // If the delete request is successful, remove the deleted offer from state
            setOffers(offers.filter((offer) => offer._id !== id));
            alert('Offer deleted successfully!');
          
        })
        .catch((error) => {
          console.error('Error deleting offer:', error);
        });
    }
  };

  return (
    <div className="coupon-table-container" id='OfferTable'>
      <h2>Offer List</h2>
      <Link to="/admin/offer/add">
        <button className="btn btn-primary" style={{ marginBottom: '10px' }}>
          Add Offer
        </button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Product ID</th> 
            <th>Offer ID</th>
            
            {/* Add table headers for other attributes */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer._id}>
              <td>{offer._id}</td>
              <td>{offer.offerID}</td>
              <td>
              {/* Add table cells for other attributes */}
              <button
                              className="bx bx-trash btn btn-outline-danger icon-lg"
                              style={{ margin: "1px" }}
                              onClick={() => handleDelete(offer.offerID)}
                        ></button>
                        <Link to={"/admin/offer/profile/" + offer.offerID}>
                          <button
                            className="bx bx-info-circle btn btn-outline-primary icon-lg"
                            style={{ margin: "5px" }}
                          ></button>
                        </Link>
                        <Link to={"/admin/offer/profile/update/" + offer._id}>
                          <button
                            className="btn btn-outline-warning"
                            style={{ margin: "2px" }}>
                            <i
                            className="bx bx-pencil"
                            style={{ fontSize: "1rem" }}
                            ></i>
                          </button>
                            </Link>
                        </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OfferTable;
