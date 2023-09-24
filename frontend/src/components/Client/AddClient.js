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

  function sendData() {
    console.log("hellow");

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

    axios
      .post("http://localhost:8000/clients/addClients", newClient)
      .then(() => {
        alert("Client Added!");
        console.log("added");
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }

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

          <Form onSubmit={sendData} className="container">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Enter First Name"
                  id="ClientsfirstName"
                  onChange={(e) => {
                    setFName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Last Name"
                  id="ClientsLastName"
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Client Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Enter Client Email"
                  id="ClientsEmail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Client Phone</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Client Phone"
                  id="ClientsPhone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  defaultValue="Galle"
                  id="ClientsState"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option>Galle</option>
                  <option>Ambalangoda</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="ClientsPostalCode"
                  onChange={(e) => {
                    setPostalcode(e.target.value);
                  }}
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
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
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
                className="form-control shadow-lg p-3 mb-5 bg-white rounded"
                id="NoOfBranches"
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
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
                  onChange={(e) => {
                    setsysEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-lightrounded"
                  type="password"
                  placeholder="Login Password"
                  id="SystemPassword"
                  onChange={(e) => {
                    setsysPassword(e.target.value);
                  }}
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
