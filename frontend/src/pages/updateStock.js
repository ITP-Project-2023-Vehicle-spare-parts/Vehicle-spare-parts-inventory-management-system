import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UpdateStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    productName: '',
    stockAmount: 0,
    additionalDetails: '',
    reorderpoint: 0,
    stockQuantity: 0,
  });

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/stock/get/${id}`);
        setStock(response.data.stock);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStockDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (
        isNaN(stock.stockAmount) ||
        isNaN(stock.stockQuantity) ||
        isNaN(stock.reorderpoint)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Values',
          text: 'Please enter valid numeric values for Stock Amount, Stock Quantity, and Reorder Level.',
        });
        return;
      }

      if (
        stock.productName.trim() === '' ||
        stock.stockAmount.toString().trim() === '' ||
        stock.stockQuantity.toString().trim() === '' ||
        stock.reorderpoint.toString().trim() === ''
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Values',
          text: 'Please fill in all fields before updating.',
        });
        return;
      }

      await axios.put(`http://localhost:8000/stock/update/${id}`, stock);
      console.log('Stock details updated');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Updated!',
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate back to FetchStock component after successful update
      navigate('/Admin/Fetch-stock');
    } catch (error) {
      console.error('Error updating stock details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Use parseInt only if the value is not an empty string
    const parsedValue = value !== '' ? parseInt(value, 10) : '';

    setStock({
      ...stock,
      [name]: name === 'stockQuantity' || name === 'stockAmount' ? parsedValue : value,
    });
  };

  return (
    <div className="stockcontainer">
       <div className="flex-grow-1 p-4">
      <h2>Edit Stock Details</h2>
      <form onSubmit={handleUpdate}>

      <div className="form-group col-md-6">
      <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Product Name:</label>
          <input
            type="text"
            name="productName"
            readOnly
            value={stock.productName}
            style={{ fontSize: '18px' }} 
          />
          </div>
          
          <div className="form-group col-md-6">
          <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Supplier Name:</label>
          <input
            type="text"
            name="supplierName"
            readOnly
            value={stock.supplierName}
          />
          </div>

          <div className="form-group col-md-6">
          <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Stock Amount:</label>
          <input
            type="text"
            name="stockAmount"
            value={stock.stockAmount}
            onChange={handleChange}
          />
          </div>
          <div className="form-group col-md-6">
          <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Stock Quantity:</label>
          <input
            type="text"
            name="stockQuantity"
            value={stock.stockQuantity}
            onChange={handleChange}
          />
          </div>

          <div className="form-group col-md-6">
          <label htmlFor="supplierName"  style={{ fontSize: '18px' }} >Stock Re Order Level:</label>
          <input
            type="text"
            name="reorderpoint"
            value={stock.reorderpoint}
            onChange={handleChange}
          />
          </div>
        
        
        <button type="button" className="btn btn-primary" onClick={handleUpdate}style={{ fontSize: '18px' }}>
          Update
        </button>
      </form>
    </div>
    </div>
  );
}

export default UpdateStock;
