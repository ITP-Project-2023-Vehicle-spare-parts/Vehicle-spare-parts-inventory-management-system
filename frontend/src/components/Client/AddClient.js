import React, { useState } from "react";
import axios from "axios";
import "boxicons/css/boxicons.min.css";
import "./AddClient.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

    if (!ClientsfirstName.trim()) {
      errors.ClientsfirstName = "First Name is required";
    }

    if (!ClientsLastName.trim()) {
      errors.ClientsLastName = "Last Name is required";
    }

    if (!ClientsEmail.trim()) {
      errors.ClientsEmail = "Email is required";
    } else if (!isValidEmail(ClientsEmail)) {
      errors.ClientsEmail = "Invalid Email format";
    }

    if (!ClientsPhone.trim()) {
      errors.ClientsPhone = "Phone Number is required";
    } else if (!isValidPhone(ClientsPhone)) {
      errors.ClientsPhone = "Invalid Phone Number format";
    }

    if (!ClientsState.trim()) {
      errors.ClientsState = "State is required";
    }

    if (!ClientsCity.trim()) {
      errors.ClientsCity = "City is required";
    }

    if (!ClientsPostalCode.trim()) {
      errors.ClientsPostalCode = "Postal Code is required";
    }

    if (!ClientsStatus.trim()) {
      errors.ClientsStatus = "Client Status is required";
    }

    if (!NoOfBranches.trim()) {
      errors.NoOfBranches = "Number Of Branches is required";
    }

    if (!SystemEmail.trim()) {
      errors.SystemEmail = "System Email is required";
    }

    if (!SystemPassword.trim()) {
      errors.SystemPassword = "System Password is required";
    } else if (SystemPassword.length < 6) {
      errors.SystemPassword = "Password should be at least 6 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Add your email validation logic here
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    // Add your phone number validation logic here
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        // Your axios POST request here
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

        const userResponse = await axios.post(
          "http://localhost:8000/clients/addClients",
          newClient
        );

        console.log(userResponse);

        // Reset form fields and show success toast
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
          duration: 3000,
          position: "top-right",
        });

        // Redirect to the desired page
        Navigate("/Admin/client/All");
      } catch (err) {
        toast.error("Failed To Register", {
          duration: 3000,
          position: "top-right",
        });
        console.error(err);
      }
    }
  };

  return (
    <div id="AddClient">
      <div className="home_content">
        <div className="text">
          <div className="text1"></div>

          <div className="form-scroll-container">
            <Form onSubmit={handleSubmit} className="container" style={{ backgroundColor: 'white', padding: '50px',borderRadius: '50px' }}>
              <h1>Add Clients...</h1>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>
                    First Name
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>

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
                  <Form.Label>
                    Last Name
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
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
                  <Form.Label>
                    Client Email
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
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
                  <Form.Label>
                    Client Phone
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-company-name">
                        Phone Number Needs to be a 10-digit number
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      type="number"
                      placeholder="Client Phone"
                      value={ClientsPhone}
                      id="ClientsPhone"
                      onChange={(e) => {
                        if (e.target.value.length > 10) {
                          toast.error("Phone number can only be 10 digits.");
                        }
                        setPhone(e.target.value.slice(0, 10)); // This will ensure the input value stays at 10 digits max
                      }}
                    />
                  </OverlayTrigger>
                  {formErrors.ClientsPhone && (
                    <div className="error-message">
                      {formErrors.ClientsPhone}
                    </div>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-5">
                <h2>
                  <b>
                    Client Address
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </b>
                </h2>
                <Form.Group as={Col}>
                  <Form.Label>
                    City
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
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
                  <Form.Label>
                    State
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    defaultValue="Galle"
                    id="ClientsState"
                    value={ClientsState}
                    style={{
                      border: "1px solid #073dff",
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
                    <option>Gampaha</option>
                    <option>Kurunegala</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    PostalCode
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
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

              <Form.Group className="mb-4">
                <Form.Label>
                  Client Status
                  <span className="text-danger" style={{ fontSize: "25px" }}>
                    *
                  </span>
                </Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-2 bg-white rounded"
                  id="ClientsStatus"
                  value={ClientsStatus}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  style={{
                    border: "1px solid #073dff",
                    borderRadius: "2px",
                    fontSize: "1.4rem",
                  }}
                >
                  <option value="">Select Status</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="other">Other</option>
                </Form.Select>
                {formErrors.ClientsStatus && (
                  <div className="error-message">
                    {formErrors.ClientsStatus}
                  </div>
                )}
              </Form.Group>

              <div className="form-outline">
                <label className="form-label" for="typeNumber">
                  Number Of Branches
                  <span className="text-danger" style={{ fontSize: "25px" }}>
                    *
                  </span>
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
                  <Form.Label>
                    Email
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
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
                  <Form.Label>
                    Password
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-company-name">
                        Password Must be at least 6 characters long
                      </Tooltip>
                    }
                  >
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
                  </OverlayTrigger>
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
