import React, { useEffect, useState } from "react";
import "./ClientProfileUpdate.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ClientProfileUpdate() {
  const id = localStorage.getItem("userID");
  console.log(id);
  const Navigate = useNavigate();

  const [client, setClient] = useState({
    ClientsfirstName:"",
    ClientsLastName:"",
    ClientsFullName:"",
    ClientsEmail:"",
    ClientsPhone:"",
    ClientsState:"",
    ClientsCity:"",
    ClientsPostalCode:"",
    ClientsStatus:"",
    NoOfBranches:"",
    role:"",
    dateAdded:"",
    SystemEmail:"",
    SystemPassword:"",

  });


  useEffect(() => {

    const fetchclient = () => {
      axios
        .get("http://localhost:8000/clients/get/" + id)
        .then((res) => {
          toast.success("Data Fetched!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
          console.log(res.data.clients);
          setClient(res.data.clients);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    fetchclient();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length > 10) {
      toast.error("Cannot enter more than 10 digits.");
      return; // Exit the function and don't update the state
    }

    if (name === "ClientsPhone" ) {
      const phoneRegex = /^[0-9]{1,10}$/; // This will match any number from 1 to 10 digits long

      if (!phoneRegex.test(value) && value !== "") {
        toast.error("Please enter a valid phone number.");
      }
    }

    setClient((prevclient) => ({
      ...prevclient,
      [name]: value,
    }));
  };

  const updateData = () => {
    axios
      .put("http://localhost:8000/clients/update/" + id, client)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'SuccessFully Updated!',
          showConfirmButton: false,
          timer: 150
        })
        Navigate("/Admin/client/Profile/:id")
        // You can add additional logic here, such as redirecting to another page
      })
      .catch((err) => {
        alert("Error updating data: " + err.message);
      });
  };

  return (
    <div id="ClientProfileUpdate">
      <body>
        
          <div class="container shadow p-2 ">
            <div class="row gutters">
              <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="account-settings">
                      <div class="user-profile">
                        <div class="user-avatar">
                          <img src="/images/me.jpg" alt="" />
                          <div className="middle">
                            <input
                              type="file"
                              class="text"
                              style={{ display: "flex" }}
                            />
                          </div>
                        </div>
                        <h5 class="user-name">{client.ClientsfirstName} {client.ClientsLastName
}</h5>
                        <h6 class="user-email">{client.ClientsEmail}</h6>
                      </div>
                      <div class="about">
                        <h5>About</h5>
                        <p>
                          {client.ClientsStatus} <br/>
                          {client.role}
                        </p>
                      </div>
                      <div class="about">
                        <h5>About Our Shop</h5>
                        <p>
                          I'm Yuki. Full Stack Designer I enjoy creating
                          user-centric, delightful and human experiences.
                        </p>
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <span style={{ textDecoration: "none" }}>
                      <h1 class="mb-2 text-Dark">Update Account</h1>
                    </span>
                  </div>
                  <div class="card-body">
  
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h4 class="mb-2 text-primary">Client Details</h4>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="ClientsfirstName"
                            name="ClientsfirstName"
                            value={client.ClientsfirstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="ClientsLastName"
                            name="ClientsLastName"
                            value={client.ClientsLastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="eMail">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="ClientsEmail"
                            name="ClientsEmail"
                            value={client.ClientsEmail}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="phone">Phone</label>
                          <input
                            type="number"
                            class="form-control"
                            id="ClientsPhone"
                            name="ClientsPhone"
                            value={client.ClientsPhone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5 class="mt-3 mb-2 text-primary">Address</h5>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="Street">City</label>
                          <input
                            type="name"
                            class="form-control"
                            id="ClientsCity"
                            name="ClientsCity"
                            value={client.ClientsCity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="ciTy">State</label>
                          <input
                            type="name"
                            class="form-control"
                            id="ClientsState"
                            name="ClientsState"
                            value={client.ClientsState}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="sTate">PostalCode</label>
                          <input
                            type="number"
                            class="form-control"
                            id="ClientsPostalCode"
                            name="ClientsPostalCode"
                            value={client.ClientsPostalCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                          >
                            client Status
                          </label>
                          <textarea
                            class="form-control"
                            id="ClientsStatus"
                            rows="3"
                            name="ClientsStatus"
                            value={client.ClientsStatus}
                            onChange={handleChange}
                            readOnly
                            style={{ backgroundColor: "#c5cde4" }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h4 class="mb-2 text-primary">Login Credential</h4>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">System Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="SystemEmail"
                            name="SystemEmail"
                            value={client.SystemEmail}
                            onChange={handleChange}
                            readOnly
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">System Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="SystemPassword"
                            name="SystemPassword"
                            value={client.SystemPassword}
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                    </div>

                    <br />

                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="text-right">
                          <button
                            type="button"
                            id="submit"
                            name="submit"
                            class="btn btn-secondary"
                            style={{ margin: "10px" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            id="submit"
                            name="submit"
                            class="btn btn-primary"
                            onClick={updateData}

                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      </body>
    </div>
  );
}
