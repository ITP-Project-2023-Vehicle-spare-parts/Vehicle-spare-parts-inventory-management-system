import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InteractiveChartsPage from './interactiveChart';
import './stockCss.css'; // Create a CSS file for styling


function LowStock() {
  const [stocks, setStocks] = useState([]);

useEffect(() => {
    const fetchLowStockAndShowNotification = async () => {
      try {
        const response = await axios.get('http://localhost:8000/stock/low-stock');

        if (response.data && response.data.lowStockProducts && response.data.lowStockProducts.length > 0) {
          setStocks(response.data.lowStockProducts); // Update the state with fetched data
          
          // Create a toast notification
          toast.info(
            <>
              <p>The following products are running low on stock:</p>
              <ul>
                {response.data.lowStockProducts.map(stock => (
                  <li key={stock._id}>
                    <strong>{stock.productName}</strong>: 
                    <span className="red-font">Quantity: {stock.stockQuantity}</span>
                  </li>
                ))}
              </ul>
              <p className="action-message">Please take action to replenish the stock.</p>
            </>,
            {
              className: 'custom-toast',
              closeButton: true,
              autoClose: 10000, // Auto close the notification after 10 seconds
            }
          );
        }
      } catch (error) {
        console.error('Error fetching low stock products:', error);
      }
    };

    fetchLowStockAndShowNotification();
  }, []);


  return (
    <div id='Allstock'>
    <div className="fetch-stock-container">
      <h1 className="fetch-stock-title">All  Low Stock</h1>
      <div className="bar-chart-container">
      <InteractiveChartsPage></InteractiveChartsPage>
      </div>
      <div>
      <table className="stock-table" id='lowstocktable'>
        <thead>
          <tr>
            <th style={stocktableHeaderStyle}>Product Name</th>
            <th style={stocktableHeaderStyle}>Supplier Name</th>
            <th style={stocktableHeaderStyle}>Stock Quantity</th>
            <th style={stocktableHeaderStyle}>Re Order Level</th>
            <th style={stocktableHeaderStyle}>Needed Stock Quantity</th>
            
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td style={stocktableCellStyle}>{stock.productName}</td>
              <td style={stocktableCellStyle}>{stock.supplierName}</td>
              <td style={stocktableCellStyle}>{stock.stockQuantity}</td>
              <td style={stocktableCellStyle}>{stock.reorderpoint}</td>
              <td style={stocktableCellStyle}>{stock.reorderpoint - stock.stockQuantity}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
}

const stocktableHeaderStyle = {
  border: '6px solid #ddd',
 
  
  textAlign: 'left',
};

const stocktableCellStyle = {
  border: '6px solid #ddd',
 
};



export default LowStock;
