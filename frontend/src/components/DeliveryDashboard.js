// DeliveryDashboard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import './DeliveryDashboard.css';

const DeliveryDashboard = () => {
  // Fake data for demonstration
  const orderStatistics = {
    totalOrders: 150,
    deliveredOrders: 120,
    pendingOrders: 30,
  };

  const recentOrders = [
    { id: 'D12345', status: 'Delivered' },
    { id: 'P67890', status: 'Pending' },
    { id: 'D54321', status: 'Delivered' },
  ];

  return (
    <div id='DeliveryDashBoard' className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Delivery Person Dashboard
        </a>
      </nav>

      <div className="dashboard-content mt-4">
        <Row>
          <Col md={6}>
            <Card className="dashboard-card statistics-card">
              <Card.Body>
                <h5>Order Statistics</h5>
                <p>Total Orders: {orderStatistics.totalOrders}</p>
                <p>
                  Delivered Orders: {orderStatistics.deliveredOrders}{' '}
                  <Badge bg="info">Delivered</Badge>
                </p>
                <p>
                  Pending Orders: {orderStatistics.pendingOrders}{' '}
                  <Badge bg="secondary">Pending</Badge>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="dashboard-card recent-orders-card">
              <Card.Body>
                <h5>Recent Orders</h5>
                {recentOrders.map((order) => (
                  <p key={order.id}>
                    Order ID: {order.id}{' '}
                    <Badge bg={order.status === 'Delivered' ? 'success' : 'warning'}>
                      {order.status}
                    </Badge>
                  </p>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="dashboard-card additional-card">
              <Card.Body>
                <h5>Next Delivery</h5>
                <p>
                  Your next delivery is scheduled for tomorrow at 10:00 AM. Make sure to check the
                  delivery address and contact details before heading out.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card additional-card">
              <Card.Body>
                <h5>Customer Feedback</h5>
                <p>
                  You received positive feedback from the last customer. Keep up the good work! It's
                  essential for our service quality.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <div className="additional-section">
              <h5>Delivery Tips</h5>
              <p>
                Remember to double-check the delivery items, use the provided navigation tools, and
                maintain a friendly attitude. Your efforts contribute to our customer satisfaction.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
