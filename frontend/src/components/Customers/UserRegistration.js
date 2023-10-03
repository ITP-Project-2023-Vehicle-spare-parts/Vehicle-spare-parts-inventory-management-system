import axios from "axios";
import React, { useState } from "react";
import "./UserRegistration.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserRegistration() {
  const [firstname, setFName] = useState("");
  const [lastname, setLName] = useState("");
  const [mobile, setmobile] = useState("");
  const [gender, setgender] = useState("");
  const [street, setstreet] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [nic, setnic] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile number format validation (10 digits)
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      toast.error("Mobile number should be 10 digits");
      return;
    }

    // Password format validation (minimum 8 characters)
    if (password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    // NIC value validation (between 10 to 12 numbers)
    if (!/^\d{10,12}$/.test(nic)) {
      toast.error("NIC should be between 10 to 12 numbers");
      return;
    }

    // Email format validation using regex
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const newUser = {
        firstname,
        lastname,
        mobile,
        nic,
        gender,
        street,
        State,
        City,
        PostalCode,
        email,
        password,
      };

      console.log(firstname);

      const userResponse = await axios.post(
        "http://localhost:8000/user/register/",
        newUser
      );

      console.log(userResponse);

      setFName("");
      setLName("");
      setnic("");
      setmobile("");
      setgender("");
      setstreet("");
      setState("");
      setCity("");
      setPostalCode("");
      setpassword("");
      setemail("");

      toast.success("Successfully Registered!", {
        duration: 3000, // 3 seconds
        position: "top-right", // You can change the position if needed
      });

      Navigate("/");
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  return (
    <div>
      <section className="h-100 " id="UserRegistration">
        <form onSubmit={handleSubmit}>
          <div className="container py-5 h-100 ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col">
                <div
                  className="card card-registration my-4 "
                  style={{
                    boxShadow: "0 .4rem .8rem 1rem rgba(159, 131, 131, 0.534)",
                  }}
                >
                  <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                      <img
                        src="/images/LOG1.png"
                        alt=""
                        className="img-fluid"
                        style={{ height: "1050px" }}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body p-md-5 text-black">
                        <h3 className="mb-5 text-uppercase">
                          <b>Customer registration form.</b>
                        </h3>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                for="form3Example1m"
                              >
                                First name
                              </label>
                              <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={firstname}
                                onChange={(e) => {
                                  setFName(e.target.value);
                                }}
                                className="form-control form-control-lg"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                for="form3Example1n"
                              >
                                Last name
                              </label>
                              <input
                                name="lastname"
                                type="text"
                                id="lastname"
                                value={lastname}
                                onChange={(e) => {
                                  setLName(e.target.value);
                                }}
                                className="form-control form-control-lg"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-outline">
                          <label className="form-label" for="form3Example1m1">
                            nic
                          </label>
                          <input
                            type="number"
                            name="nic"
                            id="nic"
                            value={nic}
                            onChange={(e) => {
                              setnic(e.target.value);
                            }}
                            className="form-control form-control-lg"
                            pattern="[0-9]{10}"
                          />

                          <br />
                        </div>

                        <div className="form-outline">
                          <label className="form-label" for="form3Example1m1">
                            Phone
                          </label>
                          <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            value={mobile}
                            onChange={(e) => {
                              setmobile(e.target.value);
                            }}
                            className="form-control form-control-lg"
                            pattern="[0-9]{10}"
                          />

                          <br />
                        </div>
                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                          <h6 className="mb-1 me-5">gender: </h6>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="fgender"
                              value="Female"
                              onChange={(e) => {
                                setgender(e.target.value);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="fgender"
                            >
                              Female
                            </label>
                          </div>

                          <div className="form-check form-check-inline mb-0 me-4">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="mgender"
                              value="Male"
                              onChange={(e) => {
                                setgender(e.target.value);
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="mgender"
                            >
                              Male
                            </label>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form3Example8">
                            street
                          </label>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={street}
                            onChange={(e) => {
                              setstreet(e.target.value);
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4 ">
                            <select
                              className="select form-control"
                              id="state"
                              name="state"
                              value={State}
                              onChange={(e) => {
                                setState(e.target.value);
                              }}
                            >
                              <option value="1">State</option>
                              <option value="2">Southern</option>
                              <option value="3">Western</option>
                              <option value="4">Eastern</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-4">
                            <select
                              className="select form-control"
                              id="city"
                              name="city"
                              value={City}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                            >
                              <option>City</option>
                              <option>Galle </option>
                              <option>Colombo</option>
                              <option>Matara</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form3Example90">
                            PostalCode
                          </label>
                          <input
                          name="PostalCode"
                            type="text"
                            id="PostalCode"
                            value={PostalCode}
                            onChange={(e) => {
                              setPostalCode(e.target.value);
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form3Example99">
                            email
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value);
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form3Example97">
                            password
                          </label>
                          <input
                            type="password"
                            id="firstname"
                            value={password}
                            onChange={(e) => {
                              setpassword(e.target.value);
                            }}
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                          <button
                            type="button"
                            className="btn btn-light btn-lg"
                          >
                            Reset all
                          </button>
                          <button
                            type="submit"
                            className="btn btn-warning btn-lg ms-2"
                          >
                            Submit form
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
