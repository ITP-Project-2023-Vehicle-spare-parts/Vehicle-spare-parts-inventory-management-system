import React, { useState } from 'react';
import axios from 'axios';

function AddStock() {
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [stockAmount, setStockAmount] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [reorderpoint, setReorderpoint] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStock = {
        productName,
        supplierName,
        stockAmount: Number(stockAmount), // Assuming stockAmount should be converted to a number
        additionalDetails,
        reorderpoint: Number(reorderpoint), // Assuming reorderpoint should be converted to a number
        stockQuantity: Number(stockQuantity), // Assuming stockQuantity should be converted to a number
      };

      await axios.post('http://localhost:8000/stock/add', newStock);

      // Clear the form fields after submission
      setProductName('');
      setSupplierName('');
      setStockAmount('');
      setAdditionalDetails('');
      setReorderpoint('');
      setStockQuantity('');
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  return (
    <div>
      <h2>Add New Stock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Supplier Name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock Amount"
          value={stockAmount}
          onChange={(e) => setStockAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Additional Details"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reorder Point"
          value={reorderpoint}
          onChange={(e) => setReorderpoint(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
}

export default AddStock;
