import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import './stockCss.css';

function StockReport() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.text('Stock Report', 10, 10);

    const table = document.getElementById('stock-table');
    pdf.autoTable({ html: '#stock-table' });

    const currentDate = new Date().toLocaleDateString();
    pdf.text(`Date: ${currentDate}`, 10, pdf.autoTable.previous.finalY + 10);

    pdf.save('stock_report.pdf');
  };

  const filterStocks = (stock) => {
    return Object.values(stock).some((field) =>
      field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredStocks = stocks.filter(filterStocks);

  return (
    <div id='Allstock'>
      <div className="fetch-stock-container">
        <h2>Stock Report...</h2>

        <input
          type="text"
          placeholder="Search by any field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={generatePDF} className='generate-pdf-button'>
          Generate PDF
        </button>

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
            {filteredStocks.map((stock) => (
              <tr key={stock._id}>
                <td>{stock.productName}</td>
                <td>{stock.supplierName}</td>
                <td>{new Date(stock.dateAdded).toLocaleDateString()}</td>
                <td>{stock.stockAmount}</td>
                <td>{stock.additionalDetails}</td>
                <td>{stock.reorderpoint}</td>
                <td>{stock.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockReport;
