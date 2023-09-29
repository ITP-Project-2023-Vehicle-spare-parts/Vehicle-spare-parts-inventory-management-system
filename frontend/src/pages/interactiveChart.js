import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import CategoryBarGraph from './barGraph'; // Assuming you have this component
import LowStockBarGraph from '../components/stockComponents/lowStockGraph';





const InteractiveChartsPage = () => {
  return (
    <Container>
      <Row>
          
        <Col lg={6} style={{ marginBottom: '20px',  marginLeft: '180px' }}>
      
            <LowStockBarGraph />
         
        </Col>
      </Row>
    </Container>
  );
};

export default InteractiveChartsPage;
