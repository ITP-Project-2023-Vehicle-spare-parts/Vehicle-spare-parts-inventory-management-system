import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import "./AddSupplier.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../features/pcategory/pcategorySlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [ProvidedCategory, setCtegory] = useState("");
  const [SystemEmail, setsysEmail] = useState("");
  const [SystemPassword, setsysPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const Navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Validate Company Name
    if (!CompanyName.trim()) {
      errors.CompanyName = "Company Name is required";
    }

    // Validate Company Email
    if (!CompanyEmail.trim()) {
      errors.CompanyEmail = "Company Email is required";
    }

    // Validate Company Phone
    if (!CompanyPhone.trim()) {
      errors.CompanyPhone = "Company Phone is required";
    } else if (!/^\d{10}$/.test(CompanyPhone)) {
      errors.CompanyPhone = "Company Phone must be a 10-digit number";
      toast.error("Phone Number Needs to be a 10-digit number", {
        duration: 3000,
        position: "top-right",
      });
    }

    // Validate Company Address
    if (!CompanyAddress.trim()) {
      errors.CompanyAddress = "Company Address is required";
    }

    // Validate Supplier First Name
    if (!SupplierfirstName.trim()) {
      errors.SupplierfirstName = "Supplier First Name is required";
    }

    // Validate Supplier Last Name
    if (!SupplierLastName.trim()) {
      errors.SupplierLastName = "Supplier Last Name is required";
    }

    // Validate Supplier Email
    if (!SupplierEmail.trim()) {
      errors.SupplierEmail = "Supplier Email is required";
    }

    // Validate Supplier Phone
    if (!SupplierPhone.trim()) {
      errors.SupplierPhone = "Supplier Phone is required";
    } else if (!/^\d+$/.test(SupplierPhone)) {
      errors.SupplierPhone = "Supplier Phone must be numeric";
    }

    // Validate Supplier State
    if (!SupplierState.trim()) {
      errors.SupplierState = "Supplier State is required";
    }

    // Validate Supplier City
    if (!SupplierCity.trim()) {
      errors.SupplierCity = "Supplier City is required";
    }

    // Validate Supplier Postal Code
    if (!SupplierPostalCode.trim()) {
      errors.SupplierPostalCode = "Supplier Postal Code is required";
    } else if (!/^\d+$/.test(SupplierPostalCode)) {
      errors.SupplierPostalCode = "Supplier Postal Code must be numeric";
    }

    // Validate Supplier Status
    if (!SupplierStatus.trim()) {
      errors.SupplierStatus = "Supplier Status is required";
    }

    // Validate Provided Brand
    if (!ProvidedBrand.trim()) {
      errors.ProvidedBrand = "Provided Brand is required";
    }

    // Validate System Email
    if (!SystemEmail.trim()) {
      errors.SystemEmail = "System Email is required";
    }

    // Validate System Password
    if (!SystemPassword.trim()) {
      errors.SystemPassword = "System Password is required";
      toast.error("Password Must be at least 6 characters long", {
        duration: 3000,
        position: "top-right",
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
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
          ProvidedCategory,
        };

        const Supplierresponse = await axios.post(
          "http://localhost:8000/supplier/addSupplier",
          newSupplier
        );

        if (Supplierresponse.status === 200) {
          const newUser = {
            firstname: SupplierfirstName,
            lastname: SupplierLastName,
            email: SystemEmail,
            password: SystemPassword,
            nic: CompanyName,
            mobile: SupplierPhone,
            role: "supplier",
          };

          const userResponse = await axios.post(
            "http://localhost:8000/user/register/",
            newUser
          );

          if (userResponse.status === 200) {
            setCName("");
            setCEmail("");
            setCPhone("");
            setcAddress("");
            setFName("");
            setLName("");
            setEmail("");
            setPhone("");
            setState("");
            setCity("");
            setPostalcode("");
            setStatus("");
            setBrand("");
            setCtegory("");
            setsysEmail("");
            setsysPassword("");

            toast.success("Successfully Registered!", {
              duration: 3000,
              position: "top-right",
            });

            Navigate("/Admin/sup/All");
          } else {
            toast.error("Failed To Register User", {
              duration: 3000,
              position: "top-right",
            });
          }
        } else {
          toast.error("Failed To Register Supplier", {
            duration: 3000,
            position: "top-right",
          });
        }
      } catch (err) {
        toast.error("An error occurred while registering.", {
          duration: 3000,
          position: "top-right",
        });
        console.error(err);
      }
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);

  return (
    <div id="AddSupplier">
      <div className="form-scroll-container">
        <div className="home_content">
          <div className="text">
            <div className="form-scroll-container">
              <Form
                onSubmit={handleSubmit}
                className="container"
                style={{
                  backgroundColor: "white",
                  padding: "50px",
                  borderRadius: "50px",
                }}
              >
                <h1>Add Suppliers...</h1>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      Company Name
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-company-name">
                          Required field
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        className="shadow-lg p-3 mb-2 bg-white rounded"
                        type="text"
                        placeholder="Company Name"
                        id="CompanyName"
                        value={CompanyName}
                        onChange={(e) => {
                          setCName(e.target.value);
                        }}
                      />
                    </OverlayTrigger>
                    {formErrors.CompanyName && (
                      <div className="error-message">
                        {formErrors.CompanyName}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      Company Email
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-company-name">
                          Required field
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        className="shadow-lg p-3 mb-2 bg-white rounded"
                        type="text"
                        placeholder="Company Email"
                        id="CompanyEmail"
                        value={CompanyEmail}
                        onChange={(e) => {
                          setCEmail(e.target.value);
                        }}
                      />
                    </OverlayTrigger>
                    {formErrors.CompanyEmail && (
                      <div className="error-message">
                        {formErrors.CompanyEmail}
                      </div>
                    )}
                  </Form.Group>
                </Row>
                <Form.Group as={Col}>
                  <Form.Label>
                    Company Phone
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-company-name">
                        Phone Number Needs to be a 10-digit number
                      </Tooltip>
                    }
                  >
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      type="number"
                      placeholder="Enter Company Phone Number"
                      id="CompanyPhone"
                      value={CompanyPhone}
                      onChange={(e) => {
                        if (e.target.value.length > 10) {
                          toast.error("Phone number can only be 10 digits.");
                        }
                        setCPhone(e.target.value.slice(0, 10)); // This will ensure the input value stays at 10 digits max
                      }}
                    />
                  </OverlayTrigger>
                  {formErrors.CompanyPhone && (
                    <div className="error-message">
                      {formErrors.CompanyPhone}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Company Address
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    placeholder="1234 Main St"
                    id="CompanyAddress"
                    value={CompanyAddress}
                    onChange={(e) => {
                      setcAddress(e.target.value);
                    }}
                  />
                  {formErrors.CompanyAddress && (
                    <div className="error-message">
                      {formErrors.CompanyAddress}
                    </div>
                  )}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      First Name
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      type="text"
                      placeholder="Enter First Name"
                      id="SupplierfirstName"
                      value={SupplierfirstName}
                      onChange={(e) => {
                        setFName(e.target.value);
                      }}
                    />
                    {formErrors.SupplierfirstName && (
                      <div className="error-message">
                        {formErrors.SupplierfirstName}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      Last Name
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      type="text"
                      placeholder="Last Name"
                      id="SupplierLastName"
                      value={SupplierLastName}
                      onChange={(e) => {
                        setLName(e.target.value);
                      }}
                    />
                    {formErrors.SupplierLastName && (
                      <div className="error-message">
                        {formErrors.SupplierLastName}
                      </div>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      Supplier Email
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      type="text"
                      placeholder="Enter Supplier Email"
                      id="SupplierEmail"
                      value={SupplierEmail}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    {formErrors.SupplierEmail && (
                      <div className="error-message">
                        {formErrors.SupplierEmail}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      Supplier Phone
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-company-name">
                          Phone Number Needs to be a 10-digit number
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        pattern="[0-9]{10}"
                        className="shadow-lg p-3 mb-2 bg-white rounded"
                        type="number"
                        placeholder="Supplier Phone"
                        id="SupplierPhone"
                        value={SupplierPhone}
                        onChange={(e) => {
                          if (e.target.value.length > 10) {
                            toast.error("Phone number can only be 10 digits.");
                          }
                          setPhone(e.target.value.slice(0, 10)); // This will ensure the input value stays at 10 digits max
                        }}
                      />
                    </OverlayTrigger>
                    {formErrors.SupplierPhone && (
                      <div className="error-message">
                        {formErrors.SupplierPhone}
                      </div>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <h2>
                    <b>
                      Supplier Address
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </b>
                  </h2>

                  <Form.Group as={Col}>
                    <Form.Label>
                      City
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Select
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      defaultValue="Galle"
                      id="SupplierCity"
                      value={SupplierCity}
                      style={{
                        border: "1PX solid #073dff",
                        borderRadius: "2px",
                        fontSize: "1.4rem",
                      }}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    >
                      {formErrors.SupplierCity && (
                        <div className="error-message">
                          {formErrors.SupplierCity}
                        </div>
                      )}
                      <option>Galle</option>
                      <option>Amabalangoda</option>
                      <option>Gampaha</option>
                      <option>Kurunegala</option>
                      <option>Kelaniya</option>
                      <option>Panadura</option>
                      <option>Amabalangoda</option>
                      <option>Matara</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      id="SupplierState"
                      placeholder="State.."
                      value={SupplierState}
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                    />
                    {formErrors.SupplierState && (
                      <div className="error-message">
                        {formErrors.SupplierState}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      PostalCode
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-white rounded"
                      id="SupplierPostalCode"
                      placeholder="postalcode..."
                      value={SupplierPostalCode}
                      type="number"
                      onChange={(e) => {
                        setPostalcode(e.target.value);
                      }}
                    />
                    {formErrors.SupplierPostalCode && (
                      <div className="error-message">
                        {formErrors.SupplierPostalCode}
                      </div>
                    )}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Company Status
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    as="textarea"
                    placeholder="About Company & Brand..."
                    rows={3}
                    id="SupplierStatus"
                    value={SupplierStatus}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  {formErrors.SupplierStatus && (
                    <div className="error-message">
                      {formErrors.SupplierStatus}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>
                    Provided Brand
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    defaultValue="Bajaj"
                    id="ProvidedBrand"
                    value={ProvidedBrand}
                    style={{
                      border: "1PX solid #073dff",
                      borderRadius: "2px",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  >
                    {formErrors.ProvidedBrand && (
                      <div className="error-message">
                        {formErrors.ProvidedBrand}
                      </div>
                    )}
                    <option>Bajaj</option>
                    <option>Yamaha</option>
                    <option>TVS</option>
                    <option>DSI</option>
                  </Form.Select>
                </Form.Group>
                <br />
                <Form.Group as={Col}>
                  <Form.Label>
                    Brand Category
                    <span className="text-danger" style={{ fontSize: "25px" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    className="shadow-lg p-3 mb-2 bg-white rounded"
                    defaultValue="Brand"
                    id="ProvidedCategory"
                    value={ProvidedCategory}
                    style={{
                      border: "1PX solid #073dff",
                      borderRadius: "2px",
                      fontSize: "1.4rem",
                    }}
                    onChange={(e) => {
                      setCtegory(e.target.value);
                    }}
                  >
                    {formErrors.ProvidedBrand && (
                      <div className="error-message">
                        {formErrors.ProvidedBrand}
                      </div>
                    )}
                    {pCategoryState.map((i, j) => {
                      return (
                        <option key={j} value={i.title}>
                          {i.title}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <br />
                <h2>
                  <b>Supplier Login Credentials</b>
                </h2>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      Email
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <Form.Control
                      className="shadow-lg p-3 mb-2 bg-lightrounded"
                      type="email"
                      placeholder="login Email"
                      id="SystemEmail"
                      value={SystemEmail}
                      onChange={(e) => {
                        setsysEmail(e.target.value);
                      }}
                    />
                    {formErrors.SystemEmail && (
                      <div className="error-message">
                        {formErrors.SystemEmail}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      Password
                      <span
                        className="text-danger"
                        style={{ fontSize: "25px" }}
                      >
                        *
                      </span>
                    </Form.Label>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="tooltip-company-name">
                          Password Must be at least 6 characters long
                        </Tooltip>
                      }
                    >
                      <Form.Control
                        className="shadow-lg p-3 mb-2 bg-lightrounded"
                        type="password"
                        placeholder="Login Password"
                        id="SystemPassword"
                        value={SystemPassword}
                        onChange={(e) => {
                          setsysPassword(e.target.value);
                        }}
                      />
                    </OverlayTrigger>
                    {formErrors.SystemPassword && (
                      <div className="error-message">
                        {formErrors.SystemPassword}
                      </div>
                    )}
                  </Form.Group>
                </Row>

                <br />

                <Button
                  className="btn"
                  size="lg"
                  variant="danger outline-info"
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
      </div>
    </div>
  );
}
