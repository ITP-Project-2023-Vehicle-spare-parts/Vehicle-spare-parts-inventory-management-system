import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderHistryTable.css';
import jsPDF from 'jspdf';
import DeliveryChart from './DeliveryChart';

function OrderHistoryTable() {
  const [originalOrderData, setOriginalOrderData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveryPersonData, setDeliveryPersonData] = useState([]);
  const [loadingDeliveryPerson, setLoadingDeliveryPerson] = useState(true);
  console.log(loadingDeliveryPerson)

  console.log(loading)
  useEffect(() => {
    // Fetch order data
    axios.get('http://localhost:8000/allOrder/orderHistory')
      .then((response) => {
        setOriginalOrderData(response.data);
        setOrderData(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setLoading(false);
      });

    // Fetch delivery person data
    axios.get('http://localhost:8000/deliveryPerson/')
      .then((response) => {
        setDeliveryPersonData(response.data);
        setLoadingDeliveryPerson(false);
        console.log("Delivery Person Data:", response.data);
      })
      .catch((error) => {
        console.error('Error fetching delivery person data:', error);
        setLoadingDeliveryPerson(false);
      });
  }, []);

  const handleSearch = () => {
    const filteredOrders = originalOrderData.filter(order =>
      order.shippingInfo.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingInfo.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingInfo.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingInfo.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setOrderData(filteredOrders);
  };

  const getDeliveryPersonDetails = (deliveryPersonId) => {
    const deliveryPerson = deliveryPersonData.find(person => person._id === deliveryPersonId);
    return deliveryPerson;
  };

  const handleReportGeneration = () => {
    const reportData = orderData.map(order => ({
      orderId: order._id,
      customerName: `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`,
      shippingAddress: `${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`,
      branch: order.branch,
      orderStatus: order.orderStatus,
    }));

    // Generate PDF report
    const doc = new jsPDF();

    const logoDataURL = '/images/CMLogo.png'; 
    doc.addImage(logoDataURL, 'PNG', 10, 10, 30, 30);

    doc.text('Order History Report', 70, 35);

    const tableOptions = {
        startY: 50, // Adjust the vertical position of the table
        margin: { top: 20, right: 10, bottom: 10, left: 10 }, // Adjust margins around the table
      };
    
      doc.autoTable({
        head: [['Order ID', 'Customer Name', 'Shipping Address', 'Branch', 'Order Status']],
        body: reportData.map(order => [order.orderId, order.customerName, order.shippingAddress, order.branch, order.orderStatus]),
        ...tableOptions, // Spread the table options
      });

    // Save or display the PDF
    doc.save('order_history_report.pdf');
  };

  return (
    <div id='OrderHistoryList'>
      <h2>Order Details</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Order ID</th>
              <th>Customer Name</th>
              <th>Shipping Address</th>
              <th>Branch</th>
              <th>Delivery Perosn ID</th>
              <th>Delivery Person</th>
              <th>Delivery Person Contact</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order._id}>
                <td className="text-center">{order._id}</td>
                <td>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</td>
                <td>{`${order.shippingInfo.address}, ${order.shippingInfo.street}, ${order.shippingInfo.city}`}</td>
                <td>{order.branch}</td>
                <td>{getDeliveryPersonDetails(order.deliveryPersonid)?.DeliveryPersonID || 'Not Assigned'}</td>
                <td>{getDeliveryPersonDetails(order.deliveryPersonid)?.deliverypersonname || 'Not Assigned'}</td>
                <td>{getDeliveryPersonDetails(order.deliveryPersonid)?.deliverypersonContactNumber || 'Not Assigned'}</td>
                <td>
                  {order.isActive && (
                    <span className="success-badge" title="Active Process"></span>
                  )}
                  <span className={`status-badge ${order.orderStatus.toLowerCase()}-status`}>
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button onClick={handleReportGeneration}>Generate Report</button>
      </div>
      <DeliveryChart />
    </div>
  );
}

export default OrderHistoryTable;
