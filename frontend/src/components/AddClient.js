// import React , {useState ,useEffect} from "react";
// import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "../CSS/AddClient.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddClient() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div>
      <div className="body">
        <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
          <div className="sidebar">
            <div className="logo_content">
              <div className="logo">
                <div className="logo_name">
                  <img
                    className="component-3-icon"
                    alt=""
                    src="/images/CMLogo.png"
                  />
                  <div className="topic-text">
                    <span style={{ color: "blue" }}>CM</span> Spare
                  </div>
                </div>
                <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
              </div>
            </div>

            <ul className="nav_list">
              <li>
                <i className="bx bx-search" onClick={toggleSidebar}></i>
                <input type="text" placeholder="Search..." />

                <dev className="tooltip">Search</dev>
              </li>
              <li>
                <Link to="/">
                  <i className="bx bx-grid-alt"></i>
                  <span className="link-name">Dashboard</span>
                </Link>
                <dev className="tooltip">Dashboard</dev>
              </li>
              <li>
                <Link to="/">
                  <i class="bx bx-user"></i>
                  <span className="link-name">User</span>
                </Link>
                <dev className="tooltip">User</dev>
              </li>

              <li>
                <Link to="/">
                  <i className="bx bx-stats"></i>
                  <span className="link-name">Analytics</span>
                </Link>
                <dev className="tooltip">Analytics</dev>
              </li>
              <li>
                <Link to="/">
                  <i className="bx bxs-package"></i>
                  <span className="link-name">Prodects</span>
                </Link>
                <dev className="tooltip">Prodects</dev>
              </li>
              <li>
                <Link to="/">
                  <i class="bx bx-money"></i>
                  <span className="link-name">Payment</span>
                </Link>
                <dev className="tooltip">Payment</dev>
              </li>
              <li>
                <Link to="/">
                  <i class="bx bx-cart-alt"></i>
                  <span className="link-name">Orders</span>
                </Link>
                <dev className="tooltip">Orders</dev>
              </li>
              <li>
                <Link to="/">
                  <i class="bx bxs-bell"></i>
                  <span className="link-name">Notification</span>
                </Link>
                <dev className="tooltip">Notification</dev>
              </li>
            </ul>

            <div className="profile_content">
              <div className="profile">
                <div className="profile_details">
                  <img src="/images/me.jpg" alt=""></img>
                  <div className="name_job">
                    <div className="name">Chanuka Devin</div>
                    <div className="">
                      <span style={{ color: "#7C7C7C" }}> YAMAHA Company</span>
                    </div>
                  </div>
                </div>
                <i className="bx bx-log-out" id="log_out"></i>
              </div>
            </div>
          </div>

          <div className="home_content">
            <div className="text">
              <div className="text1">
                <h1>
                  <b>Add Clients.</b>
                </h1>
              </div>

              <Form className="container">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      type="text"
                      placeholder="Enter First Name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      type="text"
                      placeholder="Last Name"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Client Email</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      type="text"
                      placeholder="Enter Client Email"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Client Phone</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      type="text"
                      placeholder="Client Phone"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <h2>
                    <b>Client Address</b>
                  </h2>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control className="shadow-lg p-3 mb-5 bg-white rounded" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      defaultValue="Bajaj"
                    >
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>PostalCode</Form.Label>
                    <Form.Control className="shadow-lg p-3 mb-5 bg-white rounded" />
                  </Form.Group>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Client Status</Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                    as="textarea"
                    rows={3}
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
                    id="typeNumber"
                    className="form-control shadow-lg p-3 mb-5 bg-white rounded"
                  />
                </div>

                <br />
                <h2>
                  <b>Client Login Cradintial</b>
                </h2>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-lightrounded"
                      type="email"
                      placeholder="login Email"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-5 bg-lightrounded"
                      type="password"
                      placeholder="Login Password"
                    />
                  </Form.Group>
                </Row>

                <br />

                <Button
                  className="btn"
                  size="lg"
                  variant="outline-info"
                  type="submit"
                  style={{
                    marginLeft: "550px",
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
    </div>
  );
}
