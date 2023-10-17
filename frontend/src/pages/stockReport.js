import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable
import axios from 'axios';
import './stockCss.css'; // Create a CSS file for styling



function StockReport() {
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


  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Stock Report', 10, 10);

    const table = document.getElementById('stock-table');
    console.log(table)
    pdf.autoTable({ html: '#stock-table' });

    // Get the current date
  const currentDate = new Date().toLocaleDateString();

  // Add the generated date at the end of the page
  pdf.text(`Date: ${currentDate}`, 10, pdf.autoTable.previous.finalY + 10);

    // Save the PDF with a specific name
    pdf.save('stock_report.pdf');
  };

  return (
    <div id='Allstock'>
    <div className="fetch-stock-container">
      <h2>Stock Report...</h2>
      
      <button onClick={generatePDF} className='generate-pdf-button'>Generate PDF</button>
      <table id="stock-table" className="stock-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Supplier Name</th>
            <th>Date Added</th>
            <th>Stock Amount</th>
            <th>Additional Details</th>
            <th>Reorder Point</th>
            <th>Stock Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
             <tr key={stock._id}>
             <td>{stock.productName}</td>
             <td>{stock.supplierName}</td>
             <td>{new Date(stock.dateAdded).toLocaleDateString()}</td>
             <td>{stock.stockAmount}</td>
             <td>{stock.additionalDetails}</td>
             <td>{stock.reorderpoint}</td>
             <td >{stock.stockQuantity}</td>
           </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}


  
export default StockReport;
