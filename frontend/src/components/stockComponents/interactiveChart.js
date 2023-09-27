import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryBarGraph from './barGraph'; // Assuming you have this component

import LowStockBarGraph from './lowStockGraph';

const chartContainerStyle = {
  marginBottom: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};



const InteractiveChartsPage = () => {
  return (
    <Container>
      <Row>
        <Col lg={6}>
          <div style={chartContainerStyle}>
            <CategoryBarGraph />
          </div>
        </Col>
        <Col lg={6}>
          <div style={chartContainerStyle}>
            <LowStockBarGraph />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InteractiveChartsPage;
