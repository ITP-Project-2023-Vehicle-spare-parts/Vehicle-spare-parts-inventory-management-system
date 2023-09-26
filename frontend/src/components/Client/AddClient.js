// import React , {useState ,useEffect} from "react";
import axios from "axios";
import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "./AddClient.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SupplierSideNavigation from "../SupplierSideNavigation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddClient() {
  
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

const handleSubmit = async (e) => {
   e.preventDefault();

   try{
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

    await 
    axios
      .post("http://localhost:8000/clients/addClients", newClient);
     console.log('hi')
      setFName('');
      setLName('');
      setEmail('');
      setPhone('');
      setState('');
      setCity('');
      setPostalcode('');
      setStatus('');
      setBranch('');
      setsysEmail('');
      setsysPassword('');

      toast.success("Successfully Registered!", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });
      Navigate("/Admin/client/All");

  }catch (err)  {
        alert(err.message);
        console.log(err);
  }

   };

  return (
    <div id="AddClient">
      <SupplierSideNavigation />

      <div className="home_content">
        <div className="text">
          <div className="text1">
            <h1>
              <b>Add Clients.</b>
            </h1>
          </div>

          <Form onSubmit={handleSubmit} className="container">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Enter First Name"
                  id="ClientsfirstName"
                  value={ClientsfirstName}
                  onChange={(e) => {
                    setFName(e.target.value);
                    
                  }}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Last Name"
                  id="ClientsLastName"
                  value={ClientsLastName}
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Client Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="email"
                  placeholder="Enter Client Email"
                  id="ClientsEmail"
                  value={ClientsEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Client Phone</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="number"
                  placeholder="Client Phone"
                  value={ClientsPhone}
                  id="ClientsPhone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  pattern="[0-9]{10}"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h2>
                <b>Client Address</b>
              </h2>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="ClientsCity"
                  value={ClientsCity}
                  placeholder="City..."
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  defaultValue="Galle"
                  id="ClientsState"
                  value={ClientsState}
                  style={{border:'3px solid #073dff' ,borderRadius:'2px',fontSize:'1.4rem'}}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required
                >
                  <option>Galle</option>
                  <option>Ambalangoda</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  type="number"
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="ClientsPostalCode"
                  value={ClientsPostalCode}
                  onChange={(e) => {
                    setPostalcode(e.target.value);
                  }}
                  placeholder="postalCode..."
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Client Status</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                as="textarea"
                rows={3}
                id="ClientsStatus"
                placeholder="status..."
                value={ClientsStatus}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              />
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
                required
              />
            </div>

            <br />
            <h2>
              <b>Client Login Cradintial</b>
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
                  required
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
                  required
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
