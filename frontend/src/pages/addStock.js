import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import StockSideBar from '../components/stockComponents/stockSideBar';
import './stockCss.css'; // Create a CSS file for styling

function AddStock() {
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [reorderpoint, setReorderpoint] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !productName ||
      !supplierName ||
      ! stockAmount||
      ! reorderpoint||
      ! stockQuantity||
      isNaN(stockAmount) ||
      isNaN(reorderpoint) ||
      isNaN(stockQuantity)
    ) {
      toast.error('Please fill in all fields with valid values.');
      return;
    }

    try {
      const newStock = {
        productName,
        supplierName,
        stockAmount: Number(stockAmount),
        additionalDetails,
        reorderpoint: Number(reorderpoint),
        stockQuantity: Number(stockQuantity),
      };

      await axios.post('http://localhost:8000/stock/add', newStock);


      // Clear the form fields after submission
      setProductName('');
      setSupplierName('');
      setStockAmount('');
      setAdditionalDetails('');
      setReorderpoint('');
      setStockQuantity('');

      Swal.fire({
        icon: 'success',
        title: 'Stock Added',
        text: 'The stock item has been added successfully!',
      });
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <div className="stockcontainer">
   
   <div className="flex-grow-1 p-4">
      <h2>Add Initial Stock</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-row">
          <div className="form-group col-md-6">
          <label htmlFor="productName" style={{ fontSize: '18px' }}>Product Name</label>

    <select name="disabled" id="cars" value={productName}onChange={(e) => setProductName(e.target.value)}
     requiredclassName="form-control"
     className="form-control custom-select"
     style={{ fontSize: '18px' }}
    
    >

    <option value="Bajaj CT100 osadGuard" >Bajaj CT100 osadGuard</option>
    <option value="Bajaj CT100 Guard">Bajaj CT100 Guard</option>
    <option value="Bajaj CT100 OkgsOudGuard">Bajaj CT100 OkgsOudGuard</option>
    <option value="Bajaj CT100 OigOudGuard">Bajaj CT100 OigOudGuar</option>

    </select>

          </div>
          <div className="form-group col-md-6">
            <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Supplier Name</label>
            <input
              type="text"
              className="form-control custom-input"
              id="supplierName"
              placeholder="e.g., ABC Electronics"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
              style={{ fontSize: '18px' }} 
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="stockAmount" style={{ fontSize: '18px' }}>Stock Amount</label>
            <input
              type="number"
              className="form-control custom-input"
              id="stockAmount"
              placeholder="e.g., 1000"
              value={stockAmount}
              onChange={(e) => setStockAmount(e.target.value)}
              required
              style={{ fontSize: '18px' }}
            />
          </div>
          
           <div className="form-group col-md-6">
            <label htmlFor="additionalDetails" style={{ fontSize: '18px' }}>Additional Details (optional)</label>
            <input
              type="text"
              className="form-control custom-input"
              id="additionalDetails"
              placeholder="Additional details"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              style={{ fontSize: '18px' }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="reorderpoint" style={{ fontSize: '18px' }}>Reorder Point</label>
            <input
              type="number"
              className="form-control custom-input"
              id="reorderpoint"
              placeholder="e.g., 10"
              value={reorderpoint}
              onChange={(e) => setReorderpoint(e.target.value)}
              required
              style={{ fontSize: '18px' }}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="stockQuantity" style={{ fontSize: '18px' }}>Stock Quantity</label>
            <input
              type="number"
              className="form-control custom-input"
              id="stockQuantity"
              placeholder="e.g., 50"
              value={stockQuantity}
              required
              onChange={(e) => setStockQuantity(e.target.value)}
              style={{ fontSize: '18px' }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary"   style={{ fontSize: '18px' }} >Add Stock</button>
      </form>
      </div>
    </div>
    
  );
}

export default AddStock;
