import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeliveryPersonCurrentOrder.css';

function DeliveryPersonCurrentOrder() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const email = sessionStorage.getItem("userEmail");

  useEffect(() => {
    axios.get(`http://localhost:8000/deliveryPerson/getByMail/${email}`)
      .then((response) => {
        const deliveryPersonData = response.data.deliveryPerson;
        if (deliveryPersonData && deliveryPersonData._id) {
          setDeliveryPerson(deliveryPersonData);
        } else {
          console.error('Invalid delivery person data:', deliveryPersonData);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching delivery person data:', error);
        setLoading(false);
      });
  }, [email]);

  useEffect(() => {
    if (deliveryPerson) {
      axios.get(`http://localhost:8000/allOrder/OrderByDeliveryPersonID/${deliveryPerson._id}`)
        .then((response) => {
          setOrderData(response.data.deliveryOrders || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order data:', error);
          setLoading(false);
        });
    }


  }, [deliveryPerson]);

  const handleOrderSelect = (selectedOrderId) => {
    const order = orderData.find(order => order._id === selectedOrderId);
    setSelectedOrder(order);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOrder) {
      console.error('No order selected.');
      return;
    }

    const selectedOrderId = selectedOrder._id;
    const selectedOrderStatus = event.target.orderStatus.value;

    try {
      const response = await axios.put(`http://localhost:8000/allOrder/updateStatus/${selectedOrderId}`, {
        orderStatus: selectedOrderStatus,
      });

      console.log('Order status updated successfully:', response.data);


      window.location.href = '/delivery';

    } catch (error) {
      console.error('Error updating order status:', error.response.data);
    }
  };

  return (
    <div id="DeliverypersonCurrentOrder" className="container">
      <h2>Order Details</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="order-list">
            {orderData.map((order) => (
             <div key={order._id} className="order-item" onClick={() => handleOrderSelect(order._id)}>
                <label>
                  Order ID:
                  <input type="text" value={order._id} readOnly />
                </label>
                <label>
                  Customer Name:
                  <input
                    type="text"
                    value={`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}
                    readOnly
                  />
                </label>
                <label>
                  Customer Contact Number:
                  <input
                    type="text"
                    value={`${order.shippingInfo.phone}`}
                    readOnly
                  />
                </label>
                <label>
                  Customer Address:
                  <input
                    type="text"
                    value={`${order.shippingInfo.address} ${order.shippingInfo.street} ${order.shippingInfo.city}`}
                    readOnly
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="text"
                    value={order.totalPrice}
                    readOnly
                  />
                </label>
                <label>
                  Order Status:
                  <select name="orderStatus" defaultValue={order.orderStatus}>
                    
                    <option value="Shipping">Shipping</option>
                    <option value="Estimated to Location in Few Hours">Estimated to Location in Few Hours</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </label>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default DeliveryPersonCurrentOrder;
