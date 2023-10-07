import React, { useEffect, useState } from "react";
import "./UserSupplierProfile.css";
import "boxicons/css/boxicons.min.css";
import SupplierSideNavigation from "../../SupplierSideNavigation";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserSupplierProfile() {

  const email = sessionStorage.getItem("userEmail");
  
  const [supplier, setSupplier] = useState("");

  
  console.log(supplier);

  useEffect(() => {
    function fetchSupplier() {
      axios
        .get("http://localhost:8000/supplier/get/sup/" + email)
        .then((res) => {
          console.log(res.data.supplier);
          setSupplier(res.data.supplier);
          toast.success("Data Fetched!", {
            duration: 5000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchSupplier();
  }, [email]);

  function UpdateSupplier(userId) {
    console.log(userId);

    localStorage.setItem("userId", userId);
  }

  return (
    <div id="UserSupplierProfile">
      <SupplierSideNavigation />
      <body>
        <span className="main_bg"></span>

        {supplier && (
          <div className="container">
            <header>
              <div className="brandLogo">
                <figure>
                  <img
                    src="/images/CMLogo.png"
                    alt="logo"
                    width="40px"
                    height="40px"
                  />
                </figure>
                <span>
                  <span style={{ color: "blue" }}>CM</span>spare
                </span>

                <Link to="/supplier/profile/update">
                  <Button
                    variant="primary"
                    onClick={() => UpdateSupplier(supplier._id)}
                    style={{ marginLeft: "775px" }}
                  >
                    Update
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="success" style={{ marginLeft: "10px" }}>
                    Invoice.
                  </Button>
                </Link>
              </div>
            </header>

            <section className="userProfile card">
              <div className="profile">
                <figure>
                  <img
                    src="/images/me.jpg"
                    alt="profile"
                    width="250px"
                    height="250px"
                  />
                </figure>
              </div>
            </section>

            <section className="work_skills card">
              <div className="work">
                <h1 className="heading">Company</h1>
                <div className="primary">
                  <h1>{supplier.ProvidedBrand}</h1>
                  <span>Primary</span>
                  <p>{supplier.SupplierStatus}</p>
                </div>

                <div className="secondary">
                  <h1>Others</h1>
                  <span>Secondary</span>
                  <p>
                    {supplier.CompanyName}.<br /> {supplier.CompanyEmail}.<br />
                    {supplier.CompanyAddress}
                  </p>
                </div>
              </div>

              <div className="skills">
                <h1 className="heading">Brand</h1>
                <ul>
                  <li>Bajaj</li>
                  <li>DSI</li>
                  <li>TVS</li>
                  <li>HONDA</li>
                </ul>
              </div>
            </section>

            <section className="userDetails card">
              <div className="userName">
                <h1 className="name">{supplier.SupplierfirstName}</h1>
                <div className="map">
                  <i className="bx bx-location-plus bx-md"></i>
                  <span>{supplier.SupplierCity}</span>
                </div>
                <p>{supplier.role} profile</p>
                <p>Only Provide <span style={{color:"red" , fontSize:"20px"}}>{supplier.ProvidedCategory} </span>Parts</p>
              </div>

              <div className="rank">
                <h1 className="heading">Rankings</h1>
                <span>8,6</span>
                <div className="rank">
                  <i class="bx bxs-star bx-sm "></i>
                  <i class="bx bxs-star bx-sm"></i>
                  <i class="bx bxs-star bx-sm"></i>
                  <i class="bx bxs-star-half bx-sm"></i>
                  <i class="bx bx-star rate bx-sm"></i>
                </div>
              </div>

              <div className="btns">
                <ul>
                  <li className="sendMsg">
                    <i className="ri-chat-4-fill ri"></i>
                    <a href="#!">Send Message</a>
                  </li>

                  <li className="sendMsg active">
                    <i className="ri-check-fill ri"></i>
                    <a href="#!">Contacts</a>
                  </li>

                  <li className="sendMsg">
                    <a href="#!!">Report User</a>
                  </li>
                </ul>
              </div>
            </section>

            <section className="timeline_about card">
              <div className="tabs">
                <ul>
                  <li className="about active">
                    <i className="ri-user-3-fill ri"></i>
                    <span>About Self</span>
                  </li>
                </ul>
              </div>

              <div className="contact_Info">
                <h1 className="heading">Contact Information</h1>
                <ul>
                  <li className="phone" style={{ margin: "10px" }}>
                    <h1 className="label">Phone:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {supplier.SupplierPhone}
                    </span>
                  </li>

                  <li className="address" style={{ margin: "10px" }}>
                    <h1 className="label">Address:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {supplier.SupplierPostalCode} <br />
                      {supplier.SupplierState} {""} {supplier.SupplierCity}
                    </span>
                  </li>

                  <li className="email" style={{ margin: "10px" }}>
                    <h1 className="label">E-mail:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {supplier.SupplierEmail}
                    </span>
                  </li>

                  <li className="site" style={{ margin: "10px" }}>
                    <b>
                      {" "}
                      <h1 className="label">System Email:</h1>
                    </b>
                    <span className="info" style={{ color: "red" }}>
                      {supplier.SystemEmail}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="basic_info">
                <h1 className="heading">Basic Information</h1>
                <ul>
                  <li className="birthday">
                    <h1 className="label">Join Date:</h1>
                    <span className="info">{supplier.dateAdded}</span>
                  </li>

                  <li className="sex">
                    <h1 className="label">Main Brand:</h1>
                    <span className="info">{supplier.ProvidedBrand}</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        )}
      </body>
    </div>
  );
}
