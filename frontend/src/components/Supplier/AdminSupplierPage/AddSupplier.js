import axios from "axios";
import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "./AddSupplier.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import { useNavigate } from "react-router-dom";

export default function AddSupplier() {
  const [CompanyName, setCName] = useState("");
  const [CompanyEmail, setCEmail] = useState("");
  const [CompanyPhone, setCPhone] = useState("");
  const [CompanyAddress, setcAddress] = useState("");
  const [SupplierfirstName, setFName] = useState("");
  const [SupplierLastName, setLName] = useState("");
  const [SupplierEmail, setEmail] = useState("");
  const [SupplierPhone, setPhone] = useState("");
  const [SupplierState, setState] = useState("");
  const [SupplierCity, setCity] = useState("");
  const [SupplierPostalCode, setPostalcode] = useState("");
  const [SupplierStatus, setStatus] = useState("");
  const [ProvidedBrand, setBrand] = useState("");
  const [SystemEmail, setsysEmail] = useState("");
  const [SystemPassword, setsysPassword] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newSupplier = {
        CompanyName,
        CompanyEmail,
        CompanyPhone,
        CompanyAddress,
        SupplierfirstName,
        SupplierLastName,
        SupplierEmail,
        SupplierPhone,
        SupplierStatus,
        SystemEmail,
        SystemPassword,
        SupplierCity,
        SupplierState,
        SupplierPostalCode,
        ProvidedBrand,
      };

      const response = await axios.post(
        "http://localhost:8000/supplier/addSupplier/",
        newSupplier
      );
      console.log(response);


      setCName("");
      setCEmail("");
      setCPhone("");
      setcAddress("");
      setFName("");
      setLName("");
      setEmail("");
      setPhone("");
      setState("");
      setCity("");
      setPostalcode("");
      setStatus("");
      setBrand("");
      setsysEmail("");
      setsysPassword("");

      toast.success("Successfully Registered!", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });
      Navigate("/Admin/sup/All");
    } catch (err) {
      
      toast.error("Failed To Register", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });
      console.log(err.message.status);
    }
  };

  return (
    <div id="AddSupplier">
      <SupplierSideNavigation />

      <div className="home_content">
        <div className="text">
          <div className="text1">
            <h1>
              <b>Add Suppliers.</b>
            </h1>
          </div>

          <Form onSubmit={handleSubmit} className="container">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-2 bg-white rounded"
                  type="text"
                  placeholder="Company Name"
                  id="CompanyName"
                  value={CompanyName}
                  onChange={(e) => {
                    setCName(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Company Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Company Email"
                  id="CompanyEmail"
                  value={CompanyEmail}
                  onChange={(e) => {
                    setCEmail(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
              <Form.Label>Company Phone</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                type="number"
                placeholder="Enter Company Phone Number"
                id="CompanyPhone"
                value={CompanyPhone}
                onChange={(e) => {
                  setCPhone(e.target.value);
                }}
                required // Field is required
                pattern="[0-9]{10}"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                placeholder="1234 Main St"
                id="CompanyAddress"
                value={CompanyAddress}
                onChange={(e) => {
                  setcAddress(e.target.value);
                }}
                required // Field is required
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Enter First Name"
                  id="SupplierfirstName"
                  value={SupplierfirstName}
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Last Name"
                  id="SupplierLastName"
                  value={SupplierLastName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Supplier Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Enter Supplier Email"
                  id="SupplierEmail"
                  value={SupplierEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Supplier Phone</Form.Label>
                <Form.Control
                  pattern="[0-9]{10}"
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="number"
                  placeholder="Supplier Phone"
                  id="SupplierPhone"
                  value={SupplierPhone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h2>
                <b>Supplier Address</b>
              </h2>

              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  defaultValue="Galle"
                  id="SupplierCity"
                  value={SupplierCity}
                  style={{
                    border: "3px solid #073dff",
                    borderRadius: "2px",
                    fontSize: "1.4rem",
                  }}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  required // Field is required
                >
                  <option>Galle</option>
                  <option>Amabalangoda</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="SupplierState"
                  placeholder="State.."
                  value={SupplierState}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="SupplierPostalCode"
                  placeholder="postalcode..."
                  value={SupplierPostalCode}
                  type="number"
                  onChange={(e) => {
                    setPostalcode(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Company Status</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                as="textarea"
                placeholder="About Company & Brand..."
                rows={3}
                id="SupplierStatus"
                value={SupplierStatus}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required // Field is required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Provided Brand</Form.Label>
              <Form.Select
                className="shadow-lg p-3 mb-5 bg-white rounded"
                defaultValue="Brand"
                id="ProvidedBrand"
                value={ProvidedBrand}
                style={{
                  border: "3px solid #073dff",
                  borderRadius: "2px",
                  fontSize: "1.4rem",
                }}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              >
                <option>Bajaj</option>
                <option>Yamaha</option>
                <option>TVS</option>
                <option>DSI</option>
              </Form.Select>
            </Form.Group>
            <br />
            <h2>
              <b>Supplier Login Cradintial</b>
            </h2>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-lightrounded"
                  type="email"
                  placeholder="login Email"
                  id="SystemEmail"
                  value={SystemEmail}
                  onChange={(e) => {
                    setsysEmail(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-lightrounded"
                  type="password"
                  placeholder="Login Password"
                  id="SystemPassword"
                  value={SystemPassword}
                  onChange={(e) => {
                    setsysPassword(e.target.value);
                  }}
                  required // Field is required
                />
              </Form.Group>
            </Row>

            <br />

            <Button
              className="btn"
              size="lg"
              variant="danger outline-info"
              type="submit"
              style={{
                marginLeft: "490px",
                width: "250px",
                height: "55px",
                position: "flex",
              }}
            >
              <b> Submit </b>
            </Button>
          </Form>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
}
