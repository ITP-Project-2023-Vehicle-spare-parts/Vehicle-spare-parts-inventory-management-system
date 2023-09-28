import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

import './stockCss.css'; // Create a CSS file for styling


function FetchStock() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stock/get');

      if (!response.data || !response.data.stocks) {
        console.error('No stock data found in response');
        return;
      }

      setStocks(response.data.stocks);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  return (
    <div id='Allstock'>
    <div className="fetch-stock-container">
      <h1 className="fetch-stock-title">All Stock</h1>
    
      <table className="stock-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Supplier Name</th>
            <th>Stock Amount</th>
            <th>Stock Quantity</th>
            <th>Re Order Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.productName}</td>
              <td>{stock.supplierName}</td>
              <td>{stock.stockAmount}</td>
              <td>{stock.stockQuantity}</td>
              <td>{stock.reorderpoint}</td>
              <td>
                <Link to={`/admin/updatestock/${stock._id}`}>
                  <Button className="stock-action-button edit-button">
                    <BsPencil className="stock-action-icon" />
                    
                  </Button>
                </Link>
                <span style={{ margin: '0 10px' }}></span>


                <Link to={`/delete/${stock._id}`}>

                  <Button className="stock-action-button delete-button">
                    <BsTrash className="stock-action-icon" />
                 </Button>

                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default FetchStock;
