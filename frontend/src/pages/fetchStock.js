import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrash , BsSearch } from 'react-icons/bs';
import { Button } from 'react-bootstrap';
import './stockCss.css'; // Create a CSS file for styling

function FetchStock() {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 

  
  //const navigate = useNavigate();

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

  const handleDeleteStock = async (stockId) => {
    try {
      // Send a DELETE request to delete the stock
      await axios.delete(`http://localhost:8000/stock/delete/${stockId}`);

      // After successful deletion, fetch the updated stock list
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  const filteredStocks = stocks.filter((stock) =>
    stock.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  

return (
    <div id="Allstock">
      <div className="fetch-stock-container">
        <h1 className="fetch-stock-title" >All Stock...</h1>

        <div className=" stock-search-bar" >
          <input
    type="text"
    placeholder="Search by Product Name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <BsSearch></BsSearch>
       </div>

       
         
 
         

        


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
            {searchTerm
              ? filteredStocks.map((stock) => (
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
                      <Button
                        className="stock-action-button delete-button"
                        onClick={() => handleDeleteStock(stock._id)}
                      >
                        <BsTrash className="stock-action-icon" />
                      </Button>
                    </td>
                  </tr>
                ))
              : stocks.map((stock) => (
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
                      <Button
                        className="stock-action-button delete-button"
                        onClick={() => handleDeleteStock(stock._id)}
                      >
                        <BsTrash className="stock-action-icon" />
                      </Button>
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
