import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


function FetchStock() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stock/get');
      setStocks(response.data.stocks);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  return (
    <form onSubmit={fetchStocks}>
    <div className="container">
      <h1>All Stock</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Supplier Name</th>
            <th style={tableHeaderStyle}>Stock Amount</th>
            <th style={tableHeaderStyle}>Stock Quantity</th>
            <th style={tableHeaderStyle}>Re Order Level</th>
            <th style={tableHeaderStyle}>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td style={tableCellStyle}>{stock.productName}</td>
              <td style={tableCellStyle}>{stock.supplierName}</td>
              <td style={tableCellStyle}>{stock.stockAmount}</td>
              <td style={tableCellStyle}>{stock.stockQuantity}</td>
              <td style={tableCellStyle}>{stock.reorderpoint}</td>
              <td style={tableCellStyle}>
                {/* Link to the update page */}
                <Link to={`/update/${stock._id}`} className="btn btn-warning">
                  Update
                </Link>
                <Link to={`/delete/${stock._id}`} className="btn btn-warning">
                  Delete
                </Link>
                
                {/* Button to delete */}
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </form>
  );
}

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  background: '#f2f2f2',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};



export default FetchStock;
