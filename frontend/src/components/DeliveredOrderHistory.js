import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeliveredOrderHistory.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function DeliveredOrderHistory() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryPerson, setDeliveryPerson] = useState(null);
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
          const deliveredOrders = response.data.deliveryOrders.filter(order => order.orderStatus === "Delivered");
          setOrderData(deliveredOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order data:', error);
          setLoading(false);
        });
    }
  }, [deliveryPerson]);

  return (
    <div className="container mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Address</th>
              <th scope="col">Total Price</th>
              <th scope="col">Delivered Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</td>
                <td>{`${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`}</td>
                <td>Rs.{order.totalPriceAfterDiscount.toFixed(2)}</td>
                <td>{new Date(order.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DeliveredOrderHistory;
