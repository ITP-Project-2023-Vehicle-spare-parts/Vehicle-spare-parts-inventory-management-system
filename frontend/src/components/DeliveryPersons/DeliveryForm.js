import React, { useState } from 'react';
import axios from 'axios';
import "boxicons/css/boxicons.min.css";
import "./DeliveryForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SupplierSideNavigation from '../SupplierSideNavigation';
import toast from 'react-hot-toast';


function DeliveryForm() {
  const [formData, setFormData] = useState({
    DeliveryPersonID: '',
    deliverypersonname: '',
    deliverypersonGender: '',
    deliverypersonDOB: '',
    deliverypersonContactNumber: '',
    deliverypersonEmail: '',
    deliverypersonNIC: '',
    deliverypersonAddress: '',
    deliverypersonDLN: '',
    deliverypersonDLexpire: '',
    deliverypersonExperience: '',
    deliverypersonVehicleType: '',
    deliverypersonVehicleNumber: '',
    deliverypersonBranch: '',
    deliverypersonUsername: '',
    deliverypersonPassword: '',
    deliverypersonReEnter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      await axios.post(
        'http://localhost:8000/deliveryPerson/adddeliveryPersonController',
        formData
      );
      toast.success("Successfully Add Supplier!", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });
      // Clear the form
      setFormData({
        DeliveryPersonID: '',
        deliverypersonname: '',
        deliverypersonGender: '',
        deliverypersonDOB: '',
        deliverypersonContactNumber: '',
        deliverypersonEmail: '',
        deliverypersonNIC: '',
        deliverypersonAddress: '',
        deliverypersonDLN: '',
        deliverypersonDLexpire: '',
        deliverypersonExperience: '',
        deliverypersonVehicleType: '',
        deliverypersonVehicleNumber: '',
        deliverypersonBranch: '',
        deliverypersonUsername: '',
        deliverypersonPassword: '',
        deliverypersonReEnter: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div id="DeliveryForm">
      <SupplierSideNavigation />
      
      <div className="home_content">
        <div className="text">
          <div className="text1">
            <h1>
              <b>Add Delivery Person</b>
            </h1>
          </div>

          <Form onSubmit={handleSubmit} className="container">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Delivery Person ID</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  id="DeliveryPersonID"
                  name="DeliveryPersonID"
                  value={formData.DeliveryPersonID}
                  onChange={handleChange}
                  />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
            id="deliverypersonname"
            name="deliverypersonname"
            value={formData.deliverypersonname}
            onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="date"
                  id="deliverypersonDOB"
                  name="deliverypersonDOB"
                  value={formData.deliverypersonDOB}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type = "number"
                  id="deliverypersonContactNumber"
                  name="deliverypersonContactNumber"
                  value={formData.deliverypersonContactNumber}
                  onChange={handleChange}
                  
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  id="deliverypersonEmail"
                  name="deliverypersonEmail"
                  value={formData.deliverypersonEmail}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="deliverypersonGender"
                  name="deliverypersonGender"
                  value={formData.deliverypersonGender}
                  onChange={handleChange}
                          >
                 <option value="">Select Gender</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Unspecified">Unspecified</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>NIC Number</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
            id="deliverypersonNIC"
            name="deliverypersonNIC"
            value={formData.deliverypersonNIC}
            onChange={handleChange}
                />
              </Form.Group>
            </Row>
            
            <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                type="text"
            id="deliverypersonAddress"
            name="deliverypersonAddress"
            value={formData.deliverypersonAddress}
            onChange={handleChange}
              />
            </Form.Group>
            </Row>

            <Row className="mb-3">
            
            <Form.Label>Driving License Number</Form.Label>
            <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                type="text"
                id="deliverypersonDLN"
                name="deliverypersonDLN"
                value={formData.deliverypersonDLN}
                onChange={handleChange}
              />
              <Form.Group as={Col}>
                <Form.Label>DL Expire Date</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="date"
                  id="deliverypersonDLexpire"
                  name="deliverypersonDLexpire"
                  value={formData.deliverypersonDLexpire}
                  onChange={handleChange}
                />
                </Form.Group>
            </Row>
            
            
            <Row className="mb-3">
              
              

                <Form.Group as={Col}>
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="deliverypersonVehicleType"
                name="deliverypersonVehicleType"
                value={formData.deliverypersonVehicleType}
                onChange={handleChange}
               >
                <option value="">Select Vehicle</option>
               <option value="Branch A">Bike</option>
               <option value="Branch B">Three wheel</option>
                <option value="Branch C">Lorry</option>
                </Form.Select>
                </Form.Group>

                 <Form.Group as={Col}>
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  id="deliverypersonVehicleNumber"
                  name="deliverypersonVehicleNumber"
                  value={formData.deliverypersonVehicleNumber}
                  onChange={handleChange}
                />
                </Form.Group>
               </Row>
               <Row className="mb-3">
              
                <Form.Group as={Col}>
                <Form.Label>Working Branch</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="deliverypersonBranch"
            name="deliverypersonBranch"
            value={formData.deliverypersonBranch}
            onChange={handleChange}
            >
            <option value="">Select Branch</option>
            <option value="Branch A">Branch A</option>
            <option value="Branch B">Branch B</option>
            <option value="Branch C">Branch C</option>
                </Form.Select>
              </Form.Group>

              
              
            </Row>

            <br />
            <h2>
              <b>Client Login Cradintial</b>
            </h2>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-lightrounded"
                  type="text"
            id="deliverypersonUsername"
            name="deliverypersonUsername"
            value={formData.deliverypersonUsername}
            onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-lightrounded"
                  type="password"
            id="deliverypersonPassword"
            name="deliverypersonPassword"
            value={formData.deliverypersonPassword}
            onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <br />

            <Button
              className="btn"
              size="lg"
              variant="danger outline-dark"
              type="submit"
              style={{
                marginLeft: "500px",
                width: "250px",
                height: "55px",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryForm;

