import React, { useEffect, useState } from "react";
import './CustomerProfileUpdate.css';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function CustomerProfileUpdate() {
 
  const Navigate = useNavigate();

  const [user, setUser] = useState({
    
    firstname: "",
    lastname: "",
    email: "",
    nic: "",
    gender: "",
    mobile: "",
    street: "",
    state: "",
    city:"",
  });

  const userId = localStorage.getItem("userId");

    useEffect(() => {
      function fetchCustomer() {
        axios
          .get("http://localhost:8000/user/" + userId)
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
    }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const updateData = () => {
    axios
      .put("http://localhost:8000/user/edit-user/" + userId, user)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'SuccessFully Updated!',
          showConfirmButton: false,
          timer: 150
        })
        Navigate("/user/Profile")
        // You can add additional logic here, such as redirecting to another page
      })
      .catch((err) => {
        alert("Error updating data: " + err.message);
      });
  };

  return (
    <div id="CustomerProfileUpdate">
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
                        <h5 class="user-name">{user.firstname} {user.firstname
}</h5>
                        <h6 class="user-email">{user.firstname}</h6>
                      </div>
                      <div class="about">
                        <h5>My Profile</h5>
                        <p>
                          {user.firstname}
                        </p>
                      </div>
                      <div class="about">
                        
                        <p>
                        Change your profile details here.
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
                        <b>
                          <h4 class="mb-2 text-primary">User Details</h4>
                        </b>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="firstname"
                            name="firstname"
                            value={user.firstname}
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
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="phone">Mobile Number</label>
                          <input
                            type="text"
                            class="form-control"
                            id="mobile"
                            name="mobile"
                            value={user.mobile}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="gender">Gender</label>
                          <input
                            type="text"
                            class="form-control"
                            id="gender"
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                     
                      
                    </div>
                    <div class="row gutters">
                     
                   
                
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5 class="mt-3 mb-2 text-primary">Address</h5>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="Street">City Name</label>
                          <input
                            type="name"
                            class="form-control"
                            id="city"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="ciTy">State Name</label>
                          <input
                            type="name"
                            class="form-control"
                            id="state"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="ciTy">Street Name</label>
                          <input
                            type="name"
                            class="form-control"
                            id="street"
                            name="street"
                            value={user.state}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="sTate">PostalCode</label>
                          <input
                            type="text"
                            class="form-control"
                            id="SupplierPostalCode"
                            name="SupplierPostalCode"
                            value={user.SupplierPostalCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <h4 class="mb-2 text-primary">Login Credential</h4>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            readOnly
                            style={{ backgroundColor: "#c5cde4" }}
                          />
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="form-group">
                          <label for="fullName">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            
                          />
                        </div>
                      </div>
                    </div>

                    <br />

                    <div class="row gutters">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="text-right">
                         <Link to="/supplier/profile"> <button
                            type="button"
                            id="submit"
                            name="submit"
                            class="btn btn-secondary"
                            style={{ margin: "10px" }}
                          >
                            Cancel
                          </button> </Link>
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
