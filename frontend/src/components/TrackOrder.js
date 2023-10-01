// TrackOrder.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setSearch] = useState('');

  return (
    <div>
      <Header />
      <div id="Track-Order" className="center-container">
        <div className="search-container">
          <input
            type="search"
            value={orderId}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter Your Tracking ID.........."
          />
          {/* Use Link to navigate to TrackOrderDetails with the order ID */}
          <Link to={`/order-details/${orderId}`}>
            <button>Search</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackOrder;
