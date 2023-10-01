import React, { useEffect, useState } from "react";
import "./ClientProfile.css";
import "boxicons/css/boxicons.min.css";

import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ClientProfile() {

  console.log(localStorage.getItem("userID"));

  const id = localStorage.getItem("userID");
  const [client, setClient] = useState("");

  console.log(id);
  console.log(client);

  useEffect(() => {
    function fetchClient() {
      axios
        .get("http://localhost:8000/clients/get/" + id)
        .then((res) => {
          console.log(res.data.clients);
          setClient(res.data.clients);
          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchClient();
  }, [id]);

  const dateStr = client.createdAt;

  const date = new Date(dateStr);

  date.setSeconds(0, 0);

  console.log(date);


  return (
    <div id="SupplierProfile">
      
      <body>
        <span className="main_bg"></span>

        {client && (
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

                <Link to="/Admin/client/profile/update/:id">
                  <Button variant="primary" style={{ marginLeft: "775px" }} >
                    Update
                  </Button>
                </Link>
                <Link to="/Admin/client/All">
                  <Button variant="success" style={{ marginLeft: "10px" }}>
                    Clients
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
                <h1 className="heading">Status</h1>
                <div className="primary">
                  <h1>{client.ClientsStatus}</h1>
                  <span>Primary</span>
                  <p>{client.ClientsState}</p>
                </div>
                <div className="secondary">
                  <h1>Others</h1>
                  <span>Secondary</span>
                  <p>{client.ClientsfirstName}.<br/> {client.ClientsLastName}.<br/>{client.CompanyAddress}</p>
                  
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
                <h1 className="name">{client.ClientsfirstName}</h1>
                <div className="map">
                  <i className="bx bx-location-plus bx-md"></i>
                  <span>{client.ClientsCity}</span>
                </div>
                <p>{client.role}</p>
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
                      {client.ClientsPhone}
                    </span>
                  </li>

                  <li className="address" style={{ margin: "10px" }}>
                    <h1 className="label">Address:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {client.ClientsPostalCode} <br />
                      {client.ClientsState} {""} {client.ClientsCity}
                    </span>
                  </li>

                  <li className="email" style={{ margin: "10px" }}>
                    <h1 className="label">E-mail:</h1>
                    <span className="info" style={{ color: "#0099cc" }}>
                      {client.ClientsEmail}
                    </span>
                  </li>

                  <li className="site" style={{ margin: "10px" }}>
                    <b>
                      {" "}
                      <h1 className="label">System Email:</h1>
                    </b>
                    <span className="info" style={{ color: "red" }}>
                      {client.SystemEmail}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="basic_info">
                <h1 className="heading">Basic Information</h1>
                <ul>
                  <li className="birthday">
                    <h1 className="label">Join Date:</h1>
                    <span className="info">{client.dateAdded}</span>
                  </li>

                  <li className="sex">
                    <h1 className="label">Main Brand:</h1>
                    <span className="info">Bajaj</span>
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
