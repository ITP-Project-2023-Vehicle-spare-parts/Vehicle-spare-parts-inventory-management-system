import React, { useEffect, useState } from "react";
import "./UserSupplierUpdateProfile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function UpdateProfileAdmin() {
  const Navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    SupplierfirstName: "",
    CompanyName: "",
    CompanyEmail: "",
    CompanyPhone: "",
    CompanyAddress: "",
    SupplierLastName: "",
    SupplierEmail: "",
    SupplierPhone: "",
    SupplierStatus: "",
    SystemEmail: "",
    SystemPassword: "",
    SupplierCity: "",
    SupplierState: "",
    SupplierPostalCode: "",
    ProvidedBrand: "",
  });

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchSupplier = () => {
      axios
        .get("http://localhost:8000/supplier/get/" + userId)
        .then((res) => {
          toast.success("Data Fetched!", {
            duration: 5000, // 3 seconds
            position: "top-right", // You can change the position if needed
          });
          console.log(res.data.supplier);
          setSupplier(res.data.supplier);
        })
        .catch((err) => {
          alert(err.message);
        });
    };
    fetchSupplier();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the value is longer than 10 digits
    if (value.length > 10) {
      toast.error("Cannot enter more than 10 digits.");
      return; // Exit the function and don't update the state
    }

    if (name === "CompanyPhone" || name === "SupplierPhone") {
      const phoneRegex = /^[0-9]{1,10}$/; // This will match any number from 1 to 10 digits long

      if (!phoneRegex.test(value) && value !== "") {
        toast.error("Please enter a valid phone number.");
      }
    }

    // Update the state
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
};

  const updateData = () => {
    axios
      .put("http://localhost:8000/supplier/update/" + userId, supplier)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "SuccessFully Updated!",
          showConfirmButton: false,
          timer: 150,
        });
        Navigate("/Supplier/Profile");
        // You can add additional logic here, such as redirecting to another page
      })
      .catch((err) => {
        alert("Error updating data: " + err.message);
      });
  };

  return (
    <div id="UserSupplierUpdateProfile">
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
                      <h5 class="user-name">
                        {supplier.SupplierfirstName} {supplier.SupplierLastName}
                      </h5>
                      <h6 class="user-email">{supplier.SupplierEmail}</h6>
                    </div>
                    <div class="about">
                      <h5>About My Status</h5>
                      <p>{supplier.SupplierStatus}</p>
                    </div>
                    <div class="about">
                      <h5>From CMSpare</h5>
                      <p>
                        Many online retailers and e-commerce platforms offer a
                        wide range of vehicle spare parts. You can search for
                        the specific part you need and check its availability on
                        these platforms.
                      </p>
                      <p>
                        Some suppliers are considered strategic partners because
                        they provide critical components or services that are
                        vital to a company's operations
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
                        <h4 class="mb-2 text-primary">Company Details</h4>
                      </b>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="fullName">Company Name</label>

                        <input
                          type="text"
                          class="form-control"
                          id="CompanyName"
                          name="CompanyName"
                          value={supplier.CompanyName}
                          onChange={handleChange}
                          readOnly
                          style={{ backgroundColor: "#c5cde4" }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="eMail">Company Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="CompanyEmail"
                          name="CompanyEmail"
                          value={supplier.CompanyEmail}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="phone">Company Phone</label>

                        <input
                          type="number"
                          class="form-control"
                          id="CompanyPhone"
                          name="CompanyPhone"
                          value={supplier.CompanyPhone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="website">Company Address</label>
                        <input
                          type="text"
                          class="form-control"
                          id="CompanyAddress"
                          name="CompanyAddress"
                          value={supplier.CompanyAddress}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h4 class="mb-2 text-primary">Supplier Details</h4>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="fullName">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="SupplierfirstName"
                          name="SupplierfirstName"
                          value={supplier.SupplierfirstName}
                          onChange={handleChange}
                          style={{ backgroundColor: "#c5cde4" }}
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="fullName">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="SupplierLastName"
                          name="SupplierLastName"
                          value={supplier.SupplierLastName}
                          onChange={handleChange}
                          readOnly
                          style={{ backgroundColor: "#c5cde4" }}
                        />
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div class="form-group">
                        <label for="eMail">Email</label>
                        <input
                          type="email"
                          class="form-control"
                          id="SupplierEmail"
                          name="SupplierEmail"
                          value={supplier.SupplierEmail}
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
                          id="SupplierPhone"
                          name="SupplierPhone"
                          value={supplier.SupplierPhone}
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
                          id="SupplierCity"
                          name="SupplierCity"
                          value={supplier.SupplierCity}
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
                          id="SupplierState"
                          name="SupplierState"
                          value={supplier.SupplierState}
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
                          id="SupplierPostalCode"
                          name="SupplierPostalCode"
                          value={supplier.SupplierPostalCode}
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
                          Supplier Status
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="SupplierStatus"
                          value={supplier.SupplierStatus}
                          onChange={handleChange}
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
                          value={supplier.SystemEmail}
                          onChange={handleChange}
                          readOnly
                          style={{ backgroundColor: "#c5cde4" }}
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
                          value={supplier.SystemPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <br />

                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div class="text-right">
                        <Link to="/supplier/profile">
                          {" "}
                          <button
                            type="button"
                            id="submit"
                            name="submit"
                            class="btn btn-secondary"
                            style={{ margin: "10px" }}
                          >
                            Cancel
                          </button>{" "}
                        </Link>
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
