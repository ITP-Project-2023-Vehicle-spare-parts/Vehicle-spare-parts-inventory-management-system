// import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

import {MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow,} from "mdb-react-ui-kit";
import {base_url} from "../../utils/axiosconfig";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {loginUser} from "../../features/user/userSlice";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email should be valid")
        .required("Email address is required"),
    password: yup.string().required("Password is required"),
});

export default function Login() {
    const [email, setEmail] = useState("");
    console.log(setEmail)
    const [password, setPassword] = useState("");
    console.log(setPassword)
    const Navigate = useNavigate();

    // useEffect(() => {
    //     if(getUserFromLocalStorage !== null){
    //         Navigate("/home");
    //     }
    // }, []);

    const userState = useSelector(state => state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));

        },
    });

    useEffect(() => {
      if (userState && userState.user != null && userState.isError === false) {
        if (userState.user.role === "admin") {
            Navigate("/Admin");
        } else if (userState.user.role === "supplier") {
            sessionStorage.setItem("userEmail", userState.user.email);
            Navigate("/supplier/home");
        } else if (userState.user.role === "Delivery Person") {
            sessionStorage.setItem("userEmail", userState.user.email);
            Navigate("/delivery");
        } else {
            sessionStorage.setItem("userID", userState.user._id);
            Navigate("/home");
            }
        }
    }, [userState, navigate])

    function validateLogin() {
        const loginRequest = {
            email,
            password,
        };
        axios
            .post(`${base_url}user/login`, loginRequest)
            .then((res) => {
                console.log(res.data)

                const id = res.data._id;
                localStorage.setItem("user", res.data.toString());

                if (res.data.role === "admin") {
                    console.log(res.data.role);
                    Navigate("/Admin");
                } else if (res.data.role === "supplier") {
                    console.log(res.data.email);
                    const email = res.data.email;
                    sessionStorage.setItem("userEmail", email);

                    Navigate("/supplier/home");
                } else {
                    console.log(res.data.role);

                    sessionStorage.setItem("userID", id);
                    Navigate("/home");

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
            <body
                id="login"
                style={{
                    display: "flex",
                    height: " 100vh",
                    background: "linear-gradient(180deg, #4D6DE3 0%, #C7EEFF 95.83%)",
                }}
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
                                <form
                                    action=''
                                    onSubmit={formik.handleSubmit}
                                >
                                    <div
                                        className="d-flex flex-row mt-5"
                                        style={{flexDirection: "row", display: "inline-block"}}
                                    >
                    <span>
                      <Image
                          src="images/CMLogo.png"
                          style={{width: "50px", height: "50px"}}
                          roundedCircle
                      />
                    </span>
                                        <span className="h1 fw-bold mb-0 ">
                      <span style={{color: "blue", marginLeft: "5px"}}>
                        C
                      </span>
                      hathura <span style={{color: "blue"}}>M</span>otors
                    </span>
                                    </div>

                                    <br/>
                                    <h4
                                        className="fw-normal my-4 pb-3"
                                        style={{letterSpacing: "1px"}}
                                    >
                                        Sign into your account
                                    </h4>

                                    <MDBInput
                                        wrapperClass="mt-4"
                                        label="Email address"
                                        placeholder="Enter Email"
                                        id="email"
                                        type="email"
                                        size="lg"
                                        name="Email"
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        value={formik.values.email}
                                    />
                                    <div className='error'>
                                        {formik.touched.email && formik.errors.email}
                                    </div>
                                    <MDBInput
                                        wrapperClass="mt-4"
                                        label="Password"
                                        placeholder="Enter password"
                                        id="password"
                                        type="password"
                                        size="lg"
                                        name="Password"
                                        onChange={formik.handleChange("password")}
                                        onBlur={formik.handleBlur("password")}
                                        value={formik.values.password}
                                    />
                                    <div className='error'>
                                        {formik.touched.password && formik.errors.password}
                                    </div>

                                    <Button variant="dark" size="lg" type="submit" className="mt-4">
                                        Login
                                    </Button>
                                    <center>
                                        <a className="h0 font-italic mb-1 text-muted" href="#!">
                                            Forgot password?
                                        </a>
                                        <p
                                            className="h0 fw-bold mb-1 text-muted"
                                            style={{color: "#393f81"}}
                                        >
                                            Don't have an account?{" "}
                                            <Link to="/register">
                                                {" "}
                                                <span style={{color: "#393f81"}}>
                                                    Register here
                                                </span>
                                            </Link>
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
                                </form>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
            </body>
        </div>
    );
}
