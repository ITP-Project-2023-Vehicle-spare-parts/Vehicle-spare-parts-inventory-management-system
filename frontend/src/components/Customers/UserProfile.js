import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import toast from "react-hot-toast";
import "./UserProfile.css";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const id = sessionStorage.getItem("userID");
  console.log(id);
  const [user, setUser] = useState("");

  useEffect(() => {
    function fetchCustomer() {
      axios
        .get("http://localhost:8000/user/" + id)
        .then((res) => {
          console.log(res.data.getaUser);
          setUser(res.data.getaUser);
          toast.success("Data Fetched!", {
            duration: 5000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchCustomer();
  }, [id]);

  function UpdateCustomer(id) {
    console.log(id);

    localStorage.setItem("userId", id);
  }

  return (
    <div id="UserProfile">
      <body>
        <span className="main_bg"></span>

        {user && (
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

                <Link to="/user/profile/update">
                  <Button
                    variant="primary"
                    onClick={() => UpdateCustomer(user._id)}
                    style={{ marginLeft: "775px" }}
                  >
                    Update Profile
                  </Button>
                </Link>
              </div>
            </header>

            <section className="userDetails card">
              <div className="userName">
                <h1 className="name">
                  {user.firstname} {user.lastname}
                </h1>

                <p>{user.role} profile</p>
              </div>

              <li className="email" style={{ margin: "10px" }}>
                <h1 className="label">E-mail:</h1>
                <span className="info" style={{ color: "#0099cc" }}>
                  {user.email}
                </span>
              </li>

              <li className="firstname" style={{ margin: "10px" }}>
                <h1 className="label">First Name:</h1>
                <span className="info" style={{ color: "#0099cc" }}>
                  {user.firstname}
                </span>
              </li>

              <li className="lastname" style={{ margin: "10px" }}>
                <h1 className="label">Last Name:</h1>
                <span className="info" style={{ color: "#0099cc" }}>
                  {user.lastname}
                </span>
              </li>
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
                <h1 className="heading">Other Information</h1>
                <ul>
                  <li className="phone" style={{ margin: "10px" }}>
                    <h1 className="label">Phone:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.mobile}
                    </span>
                  </li>
                  <li className="nic" style={{ margin: "10px" }}>
                    <h1 className="label">NIC:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.nic}
                    </span>
                  </li>

                  <li className="street" style={{ margin: "10px" }}>
                    <h1 className="label">Street Name:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.street} <br />
                    </span>
                  </li>
                  <li className="state" style={{ margin: "10px" }}>
                    <h1 className="label">State Name:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.state} <br />
                    </span>
                  </li>
                  <li className="city" style={{ margin: "10px" }}>
                    <h1 className="label">City Name:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.city} <br />
                    </span>
                  </li>

                  <li className="gender" style={{ margin: "10px" }}>
                    <h1 className="label">Gender:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {user.gender} <br />
                    </span>
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
