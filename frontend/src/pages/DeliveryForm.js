import React, { useState } from 'react';
import axios from 'axios';
import "boxicons/css/boxicons.min.css";
import "./DeliveryForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
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

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Validate Delivery Person ID
    if (!formData.DeliveryPersonID) {
      errors.DeliveryPersonID = 'Delivery Person ID is required';
    }

    // Validate Full Name
    if (!formData.deliverypersonname) {
      errors.deliverypersonname = 'Full Name is required';
    }

    // Validate Date of Birth
    if (!formData.deliverypersonDOB) {
      errors.deliverypersonDOB = 'Date of Birth is required';
    }

    // Validate Contact Number
    if (!formData.deliverypersonContactNumber) {
      errors.deliverypersonContactNumber = 'Contact Number is required';
    } else if (!/^\d+$/.test(formData.deliverypersonContactNumber)) {
      errors.deliverypersonContactNumber = 'Contact Number must be numeric';
    }

    // Validate Email
    if (!formData.deliverypersonEmail) {
      errors.deliverypersonEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.deliverypersonEmail)) {
      errors.deliverypersonEmail = 'Email is invalid';
    }
    if (!formData.deliverypersonGender) {
      errors.deliverypersonGender = 'Gender is required';
    }
    if (!formData.deliverypersonNIC) {
      errors.deliverypersonNIC = 'NIC is required';
    }
    if (!formData.deliverypersonAddress) {
      errors.deliverypersonAddress = 'Address is required';
    }
    if (!formData.deliverypersonDLN) {
      errors.deliverypersonDLN = 'Driving license number is required';
    }
    if (!formData.deliverypersonDLexpire) {
      errors.deliverypersonDLexpire = 'DL Expire is required';
    }
    if (!formData.deliverypersonVehicleType) {
      errors.deliverypersonVehicleType = 'Vehicle type is required';
    }
    if (!formData.deliverypersonUsername) {
      errors.deliverypersonUsername = 'User name is required';
    }
    if (!formData.deliverypersonPassword) {
      errors.deliverypersonPassword = 'Password is required';
    }
    // ... Add more validation rules for other fields ...

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
  
    if (isValid) {
      try {
        // Send a POST request to your API endpoint
        const response = await axios.post(
          'http://localhost:8000/deliveryPerson/adddeliveryPersonController',
          formData
        );
  
        console.log(response.status);
  
        if (response.status === 200) {
          const newUser = {
            firstname: formData.deliverypersonname,
            lastname: formData.deliverypersonGender,
            email: formData.deliverypersonUsername,
            password: formData.deliverypersonPassword,
            nic: formData.deliverypersonNIC,
            mobile: formData.deliverypersonContactNumber,
            role: "Delivery Person",
          };
  
          const userResponse = await axios.post(
            "http://localhost:8000/user/register/",
            newUser
          );
          console.log(userResponse.status); // Log the HTTP status code
          console.log(userResponse.data);
  
          
        }
  
        // Clear the form
        setFormData({
          // ... (Reset form fields)
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
  
        // ... Reset other states if needed
  
        toast.success("Successfully Add Delivery Person!", {
          duration: 3000,
          position: "top-right",
        });
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };
  

  return (
    <div id="DeliveryForm">
      {/* <SupplierSideNavigation /> */}
      
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
                  className={formErrors.DeliveryPersonID ? 'has-error' : ''}
                  type="text"
                  id="DeliveryPersonID"
                  name="DeliveryPersonID"
                  value={formData.DeliveryPersonID}
                  onChange={handleChange}
                  />
                  {formErrors.DeliveryPersonID && (
                  <div className="error-message">{formErrors.DeliveryPersonID}</div>
                )}
              </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Label>Full Name</Form.Label>
              <Form.Group as={Col}>
                <Form.Control
                  className={formErrors.deliverypersonname ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonname"
                  name="deliverypersonname"
                  value={formData.deliverypersonname}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonname && (
                  <div className="error-message">{formErrors.deliverypersonname}</div>
                )}
              </Form.Group>
            </Row>



            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDOB ? 'has-error' : ''}
                  type="date"
                  id="deliverypersonDOB"
                  name="deliverypersonDOB"
                  value={formData.deliverypersonDOB}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonDOB && (
                  <div className="error-message">{formErrors.deliverypersonDOB}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonContactNumber ? 'has-error' : ''}
                  type = "number"
                  id="deliverypersonContactNumber"
                  name="deliverypersonContactNumber"
                  value={formData.deliverypersonContactNumber}
                  onChange={handleChange}
                  
                />
                {formErrors.deliverypersonContactNumber && (
                  <div className="error-message">{formErrors.deliverypersonContactNumber}</div>
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonEmail ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonEmail"
                  name="deliverypersonEmail"
                  value={formData.deliverypersonEmail}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonEmail && (
                  <div className="error-message">{formErrors.deliverypersonEmail}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonGender ? 'has-error' : ''}
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
                {formErrors.deliverypersonGender && (
                  <div className="error-message">{formErrors.deliverypersonGender}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>NIC Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonNIC ? 'has-error' : ''}
                  type="text"
            id="deliverypersonNIC"
            name="deliverypersonNIC"
            value={formData.deliverypersonNIC}
            onChange={handleChange}
                />
                {formErrors.deliverypersonNIC && (
                  <div className="error-message">{formErrors.deliverypersonNIC}</div>
                )}
              </Form.Group>
            </Row>
            
            
            {/* <Row className="mb-3"> */}
              <Form.Label>Address</Form.Label>
            {/* <Form.Group > */}
              <Form.Control
                className={formErrors.deliverypersonAddress ? 'has-error' : ''}
                type="text"
            id="deliverypersonAddress"
            name="deliverypersonAddress"
            value={formData.deliverypersonAddress}
            onChange={handleChange}
              />
              {formErrors.deliverypersonAddress && (
                  <div className="error-message">{formErrors.deliverypersonAddress}</div>
                )}
            {/* </Form.Group> */}
            {/* </Row> */}

            
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Driving License Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDLN ? 'has-error' : ''}
                  type="text"
      id="deliverypersonDLN"
      name="deliverypersonDLN"
      value={formData.deliverypersonDLN}
      onChange={handleChange}
                />
                {formErrors.deliverypersonDLN && (
                  <div className="error-message">{formErrors.deliverypersonDLN}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>DL Expire Date</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDLexpire ? 'has-error' : ''}
                  type="date"
     id="deliverypersonDLexpire"
     name="deliverypersonDLexpire"
     value={formData.deliverypersonDLexpire}
     onChange={handleChange}
                />
                {formErrors.deliverypersonDLexpire && (
                  <div className="error-message">{formErrors.deliverypersonDLexpire}</div>
                )}
              </Form.Group>
            </Row>
            
            
            <Row className="mb-3">
              
              

                <Form.Group as={Col}>
                <Form.Label>Vehicle Type</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonVehicleType ? 'has-error' : ''}
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
                {formErrors.deliverypersonVehicleType && (
                  <div className="error-message">{formErrors.deliverypersonVehicleType}</div>
                )}
                </Form.Group>

                 <Form.Group as={Col}>
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonVehicleNumber ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonVehicleNumber"
                  name="deliverypersonVehicleNumber"
                  value={formData.deliverypersonVehicleNumber}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonVehicleNumber && (
                  <div className="error-message">{formErrors.deliverypersonVehicleNumber}</div>
                )}
                </Form.Group>
               </Row>
               <Row className="mb-3">
              
                <Form.Group as={Col}>
                <Form.Label>Working Branch</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonBranch ? 'has-error' : ''}
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
                {formErrors.deliverypersonBranch && (
                  <div className="error-message">{formErrors.deliverypersonBranch}</div>
                )}
              </Form.Group>

              
              
            </Row>

            <br />
            <h2>
              <b>Delivery person Login Cradintial</b>
            </h2>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonUsername ? 'has-error' : ''}
                  type="text"
            id="deliverypersonUsername"
            name="deliverypersonUsername"
            value={formData.deliverypersonUsername}
            onChange={handleChange}
                />
                {formErrors.deliverypersonUsername && (
                  <div className="error-message">{formErrors.deliverypersonUsername}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonPassword ? 'has-error' : ''}
                  type="password"
            id="deliverypersonPassword"
            name="deliverypersonPassword"
            value={formData.deliverypersonPassword}
            onChange={handleChange}
                />
                {formErrors.deliverypersonPassword && (
                  <div className="error-message">{formErrors.deliverypersonPassword}</div>
                )}
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

