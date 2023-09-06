// import React , {useState ,useEffect} from "react";
import axios from "axios";
import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../CSS/AddSupplier.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import SupplierSideNavigation from "../components/SupplierSideNavigation";

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

  function sendData() {
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

    axios
      .post("http://localhost:8000/supplier/addSupplier", newSupplier)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        toast.success("Successfully Add Supplier!", res, {
          duration: 3000, // 3 seconds
          position: "top-center", // You can change the position if needed
        });
      })
      .catch((err) => {
        alert(err.message);
        toast.error(err.message);
      });
  }

  // const [sidebarActive, setSidebarActive] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarActive(!sidebarActive);
  // };

  return (
    <div>
      <SupplierSideNavigation />
      {/* <div className="body">
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
          </div> */}

      <div className="home_content">
        <div className="text">
          <div className="text1">
            <h1>
              <b>Add Suppliers.</b>
            </h1>
          </div>

          <Form onSubmit={sendData} className="container">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Company Name"
                  id="CompanyName"
                  onChange={(e) => {
                    setCName(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Company Email</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Company Email"
                  id="CompanyEmail"
                  onChange={(e) => {
                    setCEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
              <Form.Label>Company Phone</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                type="CompanyPhone"
                placeholder="Enter Company Phone Number"
                id="CompanyPhone"
                onChange={(e) => {
                  setCPhone(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                placeholder="1234 Main St"
                id="CompanyAddress"
                onChange={(e) => {
                  setcAddress(e.target.value);
                }}
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
                  id="SupplierLastName"
                  onChange={(e) => {
                    setLName(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Supplier Phone</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  type="text"
                  placeholder="Supplier Phone"
                  id="SupplierPhone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <h2>
                <b>Supplier Address</b>
              </h2>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="SupplierState"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>State</Form.Label>
                <Form.Select
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  defaultValue="Bajaj"
                  id="SupplierCity"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="SupplierPostalCode"
                  onChange={(e) => {
                    setPostalcode(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Company Status</Form.Label>
              <Form.Control
                className="shadow-lg p-3 mb-5 bg-white rounded"
                as="textarea"
                rows={3}
                id="SupplierStatus"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Provided Brand</Form.Label>
              <Form.Select
                className="shadow-lg p-3 mb-5 bg-white rounded"
                defaultValue=""
                id=" ProvidedBrand"
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
                  type="text"
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
              variant="outline-info"
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
