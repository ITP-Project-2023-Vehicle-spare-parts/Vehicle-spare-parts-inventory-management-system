import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LowStock() {
    const [stocks, setStocks] = useState([]);


  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {
    try {
      // Make a GET request to your server's /stock/low-stock-alert endpoint
      const response = await axios.get('http://localhost:8000/stock/low-stock');

      if (!response.data || !response.data.lowStockProducts) {
        console.error('No low stock products found');
        return;
      }

      // Update the state with low stock products
      setStocks(response.data.lowStockProducts);
    } catch (error) {
      console.error('Error fetching low stock products:', error);
    }
  };
  return (
    <div className="container">
      <h1>Low products In Stock</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={stocktableHeaderStyle}>Product Name</th>
            <th style={stocktableHeaderStyle}>Supplier Name</th>
            <th style={stocktableHeaderStyle}>Stock Amount</th>
            <th style={stocktableHeaderStyle}>Stock Quantity</th>
            <th style={stocktableHeaderStyle}>Re Order Level</th>
           
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td style={stocktableCellStyle}>{stock.productName}</td>
              <td style={stocktableCellStyle}>{stock.supplierName}</td>
              <td style={stocktableCellStyle}>{stock.stockAmount}</td>
              <td style={stocktableCellStyle}>{stock.stockQuantity}</td>
              <td style={stocktableCellStyle}>{stock.reorderpoint}</td>
              <td style={stocktableCellStyle}>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const stocktableHeaderStyle = {
  border: '6px solid #ddd',
  padding: '8px',
  background: '#f2f2f2',
  textAlign: 'left',
};

const stocktableCellStyle = {
  border: '6px solid #ddd',
  padding: '8px',
};

 
export default LowStock;
