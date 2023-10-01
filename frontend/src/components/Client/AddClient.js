// import React , {useState ,useEffect} from "react";
import axios from "axios";
import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "./AddClient.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddClient() {
  const [formErrors, setFormErrors] = useState({});

  const [ClientsfirstName, setFName] = useState("");
  const [ClientsLastName, setLName] = useState("");
  const [ClientsEmail, setEmail] = useState("");
  const [ClientsPhone, setPhone] = useState("");
  const [ClientsState, setState] = useState("");
  const [ClientsCity, setCity] = useState("");
  const [ClientsPostalCode, setPostalcode] = useState("");
  const [ClientsStatus, setStatus] = useState("");
  const [NoOfBranches, setBranch] = useState("");
  const [SystemEmail, setsysEmail] = useState("");
  const [SystemPassword, setsysPassword] = useState("");
  const Navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate Company Name
    if (!ClientsfirstName.trim()) {
      errors.ClientsfirstName = "Clientsfirst Name is Requierd";
    }

    // Validate Company Email
    if (!ClientsLastName.trim()) {
      errors.ClientsLastName = "Clients LastName is Requierd";
    }

    // Validate Company Phone
    if (!ClientsPhone.trim()) {
      errors.ClientsPhone = "Clients Phone is Requierd";
    } else if (!/^\d+$/.test(ClientsPhone)) {
      errors.ClientsPhone = "Clients Phone  must be numeric";
      toast.error("Phone Number Need 10 Digit Number", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });
    }

    // Validate Company Address
    if (!ClientsEmail.trim()) {
      errors.ClientsEmail = "Clients Email is Requierd";
    }

    // Validate Supplier First Name
    if (!ClientsState.trim()) {
      errors.ClientsState = "Clients State Name is Requierd";
    }

    // Validate Client City
    if (!ClientsCity.trim()) {
      errors.ClientsCity = "Clients City is Requierd";
    }

    // Validate Supplier Email
    if (!ClientsPostalCode.trim()) {
      errors.ClientsPostalCode = "ClientsPostalCode is Requierd";
    }

    if (!ClientsStatus.trim()) {
      errors.ClientsStatus = "Clients Status is Requierd";
    }

    // Validate Supplier State
    if (!NoOfBranches.trim()) {
      errors.NoOfBranches = "No Of Branches is Requierd";
    }
    // Validate System Email
    if (!SystemEmail.trim()) {
      errors.SystemEmail = "System Email is Requierd";
    }

    // Validate System Password
    if (!SystemPassword.trim()) {
      errors.SystemPassword = "System Password is Requierd";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const newClient = {
          ClientsfirstName,
          ClientsLastName,
          ClientsEmail,
          ClientsPhone,
          ClientsState,
          ClientsCity,
          ClientsPostalCode,
          ClientsStatus,
          NoOfBranches,
          SystemEmail,
          SystemPassword,
        };

        await axios.post("http://localhost:8000/clients/addClients", newClient);
        console.log("hi");
        setFName("");
        setLName("");
        setEmail("");
        setPhone("");
        setState("");
        setCity("");
        setPostalcode("");
        setStatus("");
        setBranch("");
        setsysEmail("");
        setsysPassword("");

        toast.success("Successfully Registered!", {
          duration: 3000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
        Navigate("/Admin/client/All");
      } catch (err) {
        toast.error("Failed To Register", {
          duration: 3000, // 3 seconds
          position: "top-right", // You can change the position if needed
        });
        console.log(err);
      }
    }
  };

  return (
    <div id="AddClient">
      <div className="home_content">
        <div className="text">
          <div className="text1"></div>
          
          <div className="form-scroll-container">
           
            <Form onSubmit={handleSubmit} className="container">
            <h1>
              Add Clients...
            </h1>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    type="text"
                    placeholder="Enter First Name"
                    id="ClientsfirstName"
                    value={ClientsfirstName}
                    onChange={(e) => {
                      setFName(e.target.value);
                    }}
                  />
                  {formErrors.ClientsfirstName && (
                    <div className="error-message">
                      {formErrors.ClientsfirstName}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    type="text"
                    placeholder="Last Name"
                    id="ClientsLastName"
                    value={ClientsLastName}
                    onChange={(e) => {
                      setLName(e.target.value);
                    }}
                  />
                  {formErrors.ClientsLastName && (
                    <div className="error-message">
                      {formErrors.ClientsLastName}
                    </div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Client Email</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    type="email"
                    placeholder="Enter Client Email"
                    id="ClientsEmail"
                    value={ClientsEmail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {formErrors.ClientsEmail && (
                    <div className="error-message">
                      {formErrors.ClientsEmail}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Client Phone</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    type="number"
                    placeholder="Client Phone"
                    value={ClientsPhone}
                    id="ClientsPhone"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                  {formErrors.ClientsPhone && (
                    <div className="error-message">
                      {formErrors.ClientsPhone}
                    </div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-5">
                <h2>
                  <b>Client Address</b>
                </h2>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    id="ClientsCity"
                    value={ClientsCity}
                    placeholder="City..."
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                  {formErrors.ClientsCity && (
                    <div className="error-message">
                      {formErrors.ClientsCity}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    defaultValue="Galle"
                    id="ClientsState"
                    value={ClientsState}
                    style={{
                      border: "3px solid #073dff",
                      borderRadius: "2px",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  >
                    {formErrors.ClientsState && (
                      <div className="error-message">
                        {formErrors.ClientsState}
                      </div>
                    )}
                    <option>Galle</option>
                    <option>Ambalangoda</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>PostalCode</Form.Label>
                  <Form.Control
                    type="number"
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    id="ClientsPostalCode"
                    value={ClientsPostalCode}
                    onChange={(e) => {
                      setPostalcode(e.target.value);
                    }}
                    placeholder="postalCode..."
                  />
                  {formErrors.ClientsPostalCode && (
                    <div className="error-message">
                      {formErrors.ClientsPostalCode}
                    </div>
                  )}
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Client Status</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-2 bg-white rounded"
                  as="textarea"
                  rows={3}
                  id="ClientsStatus"
                  placeholder="status..."
                  value={ClientsStatus}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
                {formErrors.ClientsStatus && (
                  <div className="error-message">
                    {formErrors.ClientsStatus}
                  </div>
                )}
              </Form.Group>

              <div className="form-outline">
                <label className="form-label" for="typeNumber">
                  Number Of Branches
                </label>
                <input
                  min="1"
                  max="100"
                  type="number"
                  className="form-control"
                  id="NoOfBranches"
                  value={NoOfBranches}
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                />
                {formErrors.NoOfBranches && (
                  <div className="error-message">{formErrors.NoOfBranches}</div>
                )}
              </div>

              <br />
              <h2>
                <b>Client Login Cradintial</b>
              </h2>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-lightrounded"
                    type="email"
                    placeholder="login Email"
                    id="SystemEmail"
                    value={SystemEmail}
                    onChange={(e) => {
                      setsysEmail(e.target.value);
                    }}
                  />
                  {formErrors.SystemEmail && (
                    <div className="error-message">
                      {formErrors.SystemEmail}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-lightrounded"
                    type="password"
                    placeholder="Login Password"
                    id="SystemPassword"
                    value={SystemPassword}
                    onChange={(e) => {
                      setsysPassword(e.target.value);
                    }}
                  />
                  {formErrors.SystemPassword && (
                    <div className="error-message">
                      {formErrors.SystemPassword}
                    </div>
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
                <b> Submit </b>
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
