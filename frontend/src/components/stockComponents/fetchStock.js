import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BsPencil, BsTrash } from 'react-icons/bs';


import "boxicons/css/boxicons.min.css";
import { Button } from 'react-bootstrap';



function FetchStock() {
  const [stocks, setStocks] = useState([]);
  

  useEffect(() => {
    fetchStocks(); // Fetch stock data when the component mounts
  }, []);

  const fetchStocks = async () => {
    try {
      // Make a GET request to fetch stock data from the server
      const response = await axios.get('http://localhost:8000/stock/get');

      if (!response.data || !response.data.stocks) {
        console.error('No stock data found in response');
        return;
      }

      // Update the stocks state with the fetched data
      setStocks(response.data.stocks);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };



  return (
    <form >
    <div  id="FetchStock">
    <body className="FetchStock">
     
      <main clasS="table">
      <section class="table__header">
      <h1>All Stock</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={stocktableHeaderStyle}>Product Name</th>
            <th style={stocktableHeaderStyle}>Supplier Name</th>
            <th style={stocktableHeaderStyle}>Stock Amount</th>
            <th style={stocktableHeaderStyle}>Stock Quantity</th>
            <th style={stocktableHeaderStyle}>Re Order Level</th>
            <th style={stocktableHeaderStyle}>Actions</th>
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
                <Link to={`/update/${stock._id}`} >
                <Button className="stockbtn-icon" style={{ 
                  backgroundColor: '#FFB000',
                  padding: '10px 20px', // Adjust the padding for size
                  fontSize: '1.5rem',   // Adjust the font size for size
                  
                  }}  >
      <BsPencil className="stockicon" />
     
    </Button>
                </Link>
                <Link to={`/delete/${stock._id}`} >
                <Button className="stockbtn-icon" style={{ 
                  
                  backgroundColor: 'red' ,
                  padding: '10px 20px', // Adjust the padding for size
                  fontSize: '1.5rem',   // Adjust the font size for size
                  
                  }}>
  <BsTrash className="stockicon" /> 
</Button>
                </Link>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
      </main>
      </body>
    </div>
    </form>
  );
}

const stocktableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  background: '#5CD2E6',
  textAlign: 'left',
};

const stocktableCellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default FetchStock;
