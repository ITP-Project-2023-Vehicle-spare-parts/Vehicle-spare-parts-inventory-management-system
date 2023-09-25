import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function UpdateStock() {
  const { id } = useParams();
  const  navigate = useNavigate(); // Create a history object

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
      await axios.put(`http://localhost:8000/stock/update/${id}`, stock);
      console.log('Stock details updated');
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'SuccessFully Updated!',
        showConfirmButton: false,
        timer: 1500
      });
     
       // Navigate back to FetchStock component after successful update
       navigate('/fetch-stock');
    } catch (error) {
      console.error('Error updating stock details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({
      ...stock,
      [name]: name === "stockQuantity" || name === "stockAmount" ? parseInt(value, 10) : value,
    });



  };
  

  return (
    <div>
      <h2>Edit Stock Details</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            readOnly
            value={stock.productName}
          />
          <label>Supplier Name:</label>
          <input
            type="text"
            name="supplierName"
            readOnly
            value={stock.supplierName}
          />
          <label>Stock Amount:</label>
          <input
            type="text"
            name="stockAmount"
            value={stock.stockAmount}
            onChange={handleChange} // This is an editable field
          />
          <label>Stock Quantity:</label>
          <input
            type="text"
            name="stockQuantity"
            value={stock.stockQuantity}
            onChange={handleChange} // This is an editable field
          />
          <label>Stock Re Order Level:</label>
          <input
            type="text"
            name="reorderpoint"
            value={stock.reorderpoint}
            onChange={handleChange} // This is an editable field
          />
        </div>
        {/* Add input fields for other stock details */}
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateStock;
