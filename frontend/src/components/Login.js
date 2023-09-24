// import toast from "react-hot-toast";
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  function validateLogin() {
    const validate = {
      email,
      password,
    };
    axios
      .post("http://localhost:8000/api/user/login", validate)
      .then((res) => {
        console.log(res.data.role);

        if (res.data.role === "admin") {
          console.log(res.data.role);
          Navigate("/Admin/client/add");
        } else if (res.data.role === "supplier") {
          console.log(res.data.role);
          Navigate("/Admin/sup/add");
        } else {
          console.log(res.data.role);
        }

        // alert("Successfully Login!");

        toast.success("Successfully Login!", {
          duration: 3000, // 3 seconds
          position: "top-center", // You can change the position if needed
        });
      })
      .catch((err) => {
        toast.error("Login Credential Invalid!!!!");
      });
  }

  return (
    <div>
      <body id="login"
        style={{display:"flex",height:" 100vh",
          background: "linear-gradient(180deg, #4D6DE3 0%, #C7EEFF 95.83%)"}}
      >
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-6">
              <MDBCol md="5">
                <Image
                  src="images/Log1.png"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <div
                    className="d-flex flex-row mt-5"
                    style={{ flexDirection: "row", display: "inline-block" }}
                  >
                    <span>
                      <Image
                        src="images/CMLogo.png"
                        style={{ width: "50px", height: "50px" }}
                        roundedCircle
                      />
                    </span>
                    <span className="h1 fw-bold mb-0 ">
                      <span style={{ color: "blue", marginLeft: "5px" }}>
                        C
                      </span>
                      hathura <span style={{ color: "blue" }}>M</span>oters
                    </span>
                  </div>

                  <br />
                  <h4
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h4>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    placeholder="Enter Email"
                    id="email"
                    type="email"
                    size="lg"
                    name="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    placeholder="Enter password"
                    id="password"
                    type="text"
                    size="lg"
                    name="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <Button variant="dark" size="lg" onClick={validateLogin}>
                    Login
                  </Button>
                  <center>
                    <a className="h0 font-italic mb-1 text-muted" href="#!">
                      Forgot password?
                    </a>
                    <p
                      className="h0 fw-bold mb-1 text-muted"
                      style={{ color: "#393f81" }}
                    >
                      Don't have an account?{" "}
                      <a href="#!" style={{ color: "#393f81" }}>
                        Register here
                      </a>
                    </p>

                    <div className="">
                      <a href="#!" className="small text-muted me-1">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </div>
                  </center>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </body>
    </div>
  );
}
