import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BillAssign.css';
import jsPDF from 'jspdf';


function BillAssign() {
  const { id } = useParams();
  const [order, setOrder] = useState({
    orderId: '',
    orderItems: [],
    totalPrice: '',
    billNumber: '',
    billedDate: '',
    billExpiredDate: '',
    branch: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/allOrder/getOrderByID/${id}`)
      .then((response) => {
        const data = response.data;
        if (data && data.DeliveryOrders) { 
          setOrder(data.DeliveryOrders); 
        } else {
          console.error('API Response:', data);
          setError('Order data not found in the API response.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching order data.');
        setLoading(false);
      });
  }, [id]);
  

  const handleOrderItemsChange = (index, property, value) => {
    const updatedOrderItems = [...order.orderItems];
    updatedOrderItems[index][property] = value;

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: updatedOrderItems,
    }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'billedDate' || name === 'billExpiredDate') {
      const currentDate = new Date();
      const selectedDate = new Date(value);
  
      // Set the time components of currentDate and selectedDate to 00:00:00 for accurate comparison
      currentDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
  
      if (name === 'billedDate' && selectedDate.getTime() !== currentDate.getTime()) {
        alert('Billed date must be the current date.');
        return;
      }
  
      if (selectedDate < currentDate) {
        alert('Bill expiration date cannot be in the past.');
        return;
      }
    }
  
    setOrder((prevorder) => ({
      ...prevorder,
      [name]: value,
    }));
  };
  
  
  


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = { ...order, orderStatus: "Billed" }; // Assuming order is an object
    axios
      .put(`http://localhost:8000/allOrder/updateLocations/${id}`, updatedOrder)
      .then((response) => {
        alert('order updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        alert('Error updating order. Please try again later.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    
  doc.setFontSize(18);
  doc.text('Chathura Motors', 105, 15, { align: 'center' });
    doc.text('Order Items:', 20, 20);
    let yPos = 40;

    order.orderItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product}`, 30, yPos);
      yPos += 10;
    });

    doc.text(`Total Price: ${order.totalPrice}`, 20, yPos + 10);
    doc.text(`Bill Number: ${order.billNumber}`, 20, yPos + 20);
    doc.text(`Billed Date: ${order.billedDate}`, 20, yPos + 30);
    doc.text(`Bill Expired Date: ${order.billExpiredDate}`, 20, yPos + 40);
    doc.text(`Branch: ${order.branch}`, 20, yPos + 50);

    // Save the PDF with a specific name
    doc.save(`Order_${order.orderId}.pdf`);
  };
  

  return (
    <div id='BillAssign' className='bill-assign-form'>
      <h2>Bill Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for other order properties */}
        {/* <div>
          <label htmlFor="orderID">order ID:</label>
          <input
            type="text"
            id="orderID"
            name="orderID"
            value={order.orderID}
            onChange={handleInputChange}
          />
        </div> */}
        <div>
        <label htmlFor="orderItems">Order Items:</label>
          {order.orderItems.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item.product} 
              readOnly
              className='readonly-input'
              onChange={(e) => handleOrderItemsChange(index, 'product', e.target.value)}
            />
          ))}
        </div>
        <div>
          <label htmlFor="totalPrice">totalPrice:</label>
          <input
            type="text"
            id="totalPrice"
            name="totalPrice"
            value={order.totalPrice}
            readOnly
            className='readonly-input'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="billNumber">Bill Number:</label>
          <input
            type="text"
            id="billNumber"
            name="billNumber"
            value={order.billNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="billedDate">Billed Date:</label>
          <input
            type="Date"
            id="billedDate"
            name="billedDate"
            value={order.billedDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label htmlFor="billExpiredDate">Bill ExpiredDate:</label>
          <input
            type="Date"
            id="billExpiredDate"
            name="billExpiredDate"
            value={order.billExpiredDate}
            onChange={handleInputChange}
          /> 
        </div>
        <div>
        <label htmlFor="branch">Branch:</label>
        <select
           id="branch"
          name="branch"
          value={order.branch}
          onChange={handleInputChange}
        >
          <option value=""></option>
          <option value="Ibbagamuwa Main">Ibbagamuwa Main</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Colombo">Colombo</option>
          <option value="Nuwaraeliya">Nuwaraeliya</option>
          <option value="Batticalo">Batticalo</option>
  </select>
        </div>
        
        <div>
          <button type="submit">Update</button>
        </div>
        <div>
        <button type="button" onClick={generatePDF}>
          Generate PDF
        </button>
        </div>
      </form>
    </div>
  );
}

export default BillAssign;
