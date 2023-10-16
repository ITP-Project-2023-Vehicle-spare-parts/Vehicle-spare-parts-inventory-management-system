import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import "boxicons/css/boxicons.min.css";
import "./DeliveryForm.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import toast from 'react-hot-toast';
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../firebase";


function DeliveryForm() {
  const [formData, setFormData] = useState({
    DeliveryPersonID: '',
    deliverypersonname: '',
    deliverypersonGender: '',
    deliverypersonDOB: '',
    deliverypersonContactNumber: '',
    deliverypersonEmail: '',
    deliverypersonNIC: '',
    deliverypersonAddress: '',
    deliverypersonDLN: '',
    deliverypersonDLexpire: '',
    deliverypersonExperience: '',
    deliverypersonVehicleType: '',
    deliverypersonVehicleNumber: '',
    deliverypersonBranch: '',
    deliverypersonUsername: '',
    deliverypersonPassword: '',
    deliverypersonReEnter: '',
    imageUrl: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordValidation, setPasswordValidation] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [backendErrors, setBackendErrors] = useState({});
  const [latestDeliveryPersonID, setLatestDeliveryPersonID] = useState('');

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, deliverypersonPassword: password });

    // Password validation conditions
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const symbolRegex = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/;

    setPasswordValidation({
      lowercase: lowercaseRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      number: numberRegex.test(password),
      symbol: symbolRegex.test(password),
    });
  };
  useEffect(() => {
    // Fetch the latest DeliveryPersonID from the backend
    const fetchLatestDeliveryPersonID = async () => {
      try {
        const response = await axios.get('http://localhost:8000/deliveryPerson/latestID');
        setLatestDeliveryPersonID(response.data.latestID);
      } catch (error) {
        console.error('Error fetching latest DeliveryPersonID:', error);
      }
    };

    fetchLatestDeliveryPersonID();
    handleAutoIncrement(); // Automatically increment DeliveryPersonID
  }, [latestDeliveryPersonID]);

  const handleAutoIncrement = () => {
    if (latestDeliveryPersonID) {
      const numericPart = parseInt(latestDeliveryPersonID.slice(2), 10) + 1;
      const newDeliveryPersonID = `DP${numericPart.toString().padStart(4, '0')}`;
      setFormData((prevFormData) => ({ ...prevFormData, DeliveryPersonID: newDeliveryPersonID }));
    }
  };

  const handlePasswordClick = () => {
    setShowPasswordConditions(true);
  };

  const handleFieldClick = () => {
    setShowPasswordConditions(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let errors = { ...formErrors };

    
    if (name === 'image') {
      const image = files[0];
      const storageRef = ref(storage, `images/${image.name}`);
      
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress or other events
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFormData({ ...formData, imageUrl: downloadURL });
          });
        }
      );
    } else {

    }
    

    if (name === 'deliverypersonContactNumber') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonContactNumber = 'Contact Number must contain only numeric values';
      } else {
        delete errors.deliverypersonContactNumber;
      }
    }
    if (name === 'deliverypersonname') {
      if (!value) {
        errors.deliverypersonname = 'Full Name is required';
      } else if (!/^\S+(\s+\S+)+$/.test(value)) {
        errors.deliverypersonname = 'Please enter the full name';
      } else {
        delete errors.deliverypersonname;
      }
    }
    if (name === 'deliverypersonDOB') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate > currentDate) {
        errors.deliverypersonDOB = 'Date of Birth cannot be a future date';
      } else {
        delete errors.deliverypersonDOB;
      }
    }
    if (name === 'deliverypersonEmail') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errors.deliverypersonEmail = 'Email is invalid';
      } else {
        delete errors.deliverypersonEmail;
      }
    }
    if (name === 'deliverypersonDLN') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonDLN = 'Driving License Number must contain only numeric values';
      } else {
        delete errors.deliverypersonDLN;
      }
    }
    if (name === 'deliverypersonDLexpire') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        errors.deliverypersonDLexpire = 'Expire date cannot be a past date';
      } else {
        delete errors.deliverypersonDLexpire;
      }
    }

    setFormErrors(errors);
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    let errors = { ...formErrors };

    if (name === 'deliverypersonContactNumber') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonContactNumber = 'Contact Number must contain only numeric values';
      } else {
        delete errors.deliverypersonContactNumber;
      }
    }
    if (name === 'deliverypersonname') {
      if (!value) {
        errors.deliverypersonname = 'Full Name is required';
      } else if (!/^\S+(\s+\S+)+$/.test(value)) {
        errors.deliverypersonname = 'Please enter the full name';
      } else {
        delete errors.deliverypersonname;
      }
    }
    if (name === 'deliverypersonDOB') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate > currentDate) {
        errors.deliverypersonDOB = 'Date of Birth cannot be a future date';
      } else {
        delete errors.deliverypersonDOB;
      }
    }
    if (name === 'deliverypersonEmail') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errors.deliverypersonEmail = 'Email is invalid';
      } else {
        delete errors.deliverypersonEmail;
      }
    }
    if (name === 'deliverypersonDLN') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonDLN = 'Driving License Number must contain only numeric values';
      } else {
        delete errors.deliverypersonDLN;
      }
    }
    if (name === 'deliverypersonDLexpire') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        errors.deliverypersonDLexpire = 'Expire date cannot be a past date';
      } else {
        delete errors.deliverypersonDLexpire;
      }
    }

    setFormErrors(errors);
  };
  const validateForm = (e) => {
    //const errors = {};
    const { name, value } = e.target;
    let errors = { ...formErrors };

    // Validate Delivery Person ID
    if (!formData.DeliveryPersonID) {
      errors.DeliveryPersonID = 'Delivery Person ID is required';
    }

    // Validate Full Name
    if (!formData.deliverypersonname) {
      errors.deliverypersonname = 'Full Name is required';
    } else if (!/^\S+(\s+\S+)+$/.test(formData.deliverypersonname)) {
      errors.deliverypersonname = 'Please enter the full name';
    }

    // Validate Date of Birth
    if (!formData.deliverypersonDOB) {
      errors.deliverypersonDOB = 'Date of Birth is required';
    }

    if (!formData.deliverypersonContactNumber) {
      errors.deliverypersonContactNumber = 'Contact Number is required';
    } else if (!/^\d+$/.test(formData.deliverypersonContactNumber)) {
      errors.deliverypersonContactNumber = 'Contact Number must be numeric';
    }
    const limitedNumericValue = formData.deliverypersonContactNumber;

    if (limitedNumericValue.length !== 10) {
      errors.deliverypersonContactNumber = 'Contact Number must be exactly 10 digits';
    } else {
      delete errors.deliverypersonContactNumber;
    }


    // Validate Email
    if (!formData.deliverypersonEmail) {
      errors.deliverypersonEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.deliverypersonEmail)) {
      errors.deliverypersonEmail = 'Email is invalid';
    }
    if (!formData.deliverypersonGender) {
      errors.deliverypersonGender = 'Gender is required';
    }
    if (!formData.deliverypersonNIC) {
      errors.deliverypersonNIC = 'NIC is required';
    }
    if (!formData.deliverypersonAddress) {
      errors.deliverypersonAddress = 'Address is required';
    }
    if (!formData.deliverypersonDLN) {
      errors.deliverypersonDLN = 'Driving license number is required';
    }
    if (!formData.deliverypersonDLexpire) {
      errors.deliverypersonDLexpire = 'DL Expire is required';
    }

    if (!formData.deliverypersonUsername) {
      errors.deliverypersonUsername = 'User name is required';
    }
    if (!formData.deliverypersonPassword) {
      errors.deliverypersonPassword = 'Password is required';
    }
    if (name === 'deliverypersonContactNumber') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonContactNumber = 'Contact Number must contain only numeric values';
      } else {
        delete errors.deliverypersonContactNumber;
      }
    }
    if (name === 'deliverypersonname') {
      if (!value) {
        errors.deliverypersonname = 'Full Name is required';
      } else if (!/^\S+(\s+\S+)+$/.test(value)) {
        errors.deliverypersonname = 'Please enter the full name';
      } else {
        delete errors.deliverypersonname;
      }
    }
    if (name === 'deliverypersonDOB') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate > currentDate) {
        errors.deliverypersonDOB = 'Date of Birth cannot be a future date';
      } else {
        delete errors.deliverypersonDOB;
      }
    }
    if (name === 'deliverypersonEmail') {
      if (!/^\S+@\S+\.\S+$/.test(value)) {
        errors.deliverypersonEmail = 'Email is invalid';
      } else {
        delete errors.deliverypersonEmail;
      }
    }
    if (name === 'deliverypersonDLN') {
      if (!/^\d+$/.test(value)) {
        errors.deliverypersonDLN = 'Driving License Number must contain only numeric values';
      } else {
        delete errors.deliverypersonDLN;
      }
    }
    if (name === 'deliverypersonDLexpire') {
      const selectedDate = new Date(value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        errors.deliverypersonDLexpire = 'Expire date cannot be a past date';
      } else {
        delete errors.deliverypersonDLexpire;
      }
    }
    


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(e);
  
    if (isValid) {
      try {
        // Send a POST request to your API endpoint
        const response = await axios.post(
          'http://localhost:8000/deliveryPerson/adddeliveryPersonController',
          {
            ...formData,
            imageUrl: formData.imageUrl, 
          }
        );
  
        console.log(response.status);
  
        if (response.status === 200) {
          const newUser = {
            firstname: formData.deliverypersonname,
            lastname: formData.deliverypersonGender,
            email: formData.deliverypersonEmail,
            password: formData.deliverypersonPassword,
            nic: formData.deliverypersonNIC,
            mobile: formData.deliverypersonContactNumber,
            role: "Delivery Person",
          };
  
          const userResponse = await axios.post(
            "http://localhost:8000/user/register/",
            newUser
          );
          console.log(userResponse.status);
          console.log(userResponse.data);
  
          setBackendErrors({});
        }
        
        resetFormFields();
  

  
        toast.success("Successfully Add Delivery Person!", {
          duration: 3000,
          position: "top-right",
        });
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          if (data.status === 'Error' && data.error) {
            // Update formErrors state with the backend error
            setBackendErrors({
              deliverypersonUsername: data.error.deliverypersonUsername,
              deliverypersonEmail: data.error.deliverypersonEmail,
              DeliveryPersonID: data.error.DeliveryPersonID,
              deliverypersonContactNumber: data.error.deliverypersonContactNumber,
              deliverypersonDLN: data.error.deliverypersonDLN,
              deliverypersonNIC: data.error.deliverypersonNIC,
            });
            
            toast.error(data.error, {
              duration: 3000,
              position: "top-center",
            });
          }
        } else {
          console.error('Error submitting data:', error);
        }
    }}
    
    
  };
  const resetFormFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      DeliveryPersonID: '',
      deliverypersonname: '',
      deliverypersonGender: '',
      deliverypersonDOB: '',
      deliverypersonContactNumber: '',
      deliverypersonEmail: '',
      deliverypersonNIC: '',
      deliverypersonAddress: '',
      deliverypersonDLN: '',
      deliverypersonDLexpire: '',
      deliverypersonExperience: '',
      deliverypersonVehicleType: '',
      deliverypersonVehicleNumber: '',
      deliverypersonBranch: '',
      deliverypersonUsername: '',
      deliverypersonPassword: '',
      deliverypersonReEnter: '',
      imageUrl: '',
    }));
  };
  
  useEffect(() => {
    if (latestDeliveryPersonID) {
      resetFormFields();
      handleAutoIncrement();
    }
  }, [latestDeliveryPersonID]);
  

  return (
    <div id="DeliveryForm">

      
      <div className="home_content">
        <div className="text">
          <div className="text1">
            <h1>
              <b>Add Delivery Person</b>
            </h1>
          </div>

          <Form onSubmit={handleSubmit} className="container">
            <Row className="mb-3">
            <Form.Label>Delivery Person ID</Form.Label>
            <Form.Group as={Col}>
              <Form.Control
                readOnly
                type="text"
                id="DeliveryPersonID"
                name="DeliveryPersonID"
                value={formData.DeliveryPersonID}
                onChange={handleChange}
              /> 
        </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Label>Full Name</Form.Label>
              <Form.Group as={Col}>
                <Form.Control
                  className={formErrors.deliverypersonname ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonname"
                  name="deliverypersonname"
                  value={formData.deliverypersonname}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonname && (
                  <div className="error-message">{formErrors.deliverypersonname}</div>
                )}
              </Form.Group>
            </Row>



            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDOB ? 'has-error' : ''}
                  type="date"
                  id="deliverypersonDOB"
                  name="deliverypersonDOB"
                  value={formData.deliverypersonDOB}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonDOB && (
                  <div className="error-message">{formErrors.deliverypersonDOB}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              className={formErrors.deliverypersonContactNumber ? 'has-error' : ''}
              type="text"
              id="deliverypersonContactNumber"
              name="deliverypersonContactNumber"
              value={formData.deliverypersonContactNumber}
              onChange={handleChange}
              onBlur={handleBlur} 
            />
            {formErrors.deliverypersonContactNumber && (
              <div className="error-message">{formErrors.deliverypersonContactNumber}</div>
            )}
          </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonEmail ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonEmail"
                  name="deliverypersonEmail"
                  value={formData.deliverypersonEmail}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonEmail && (
                  <div className="error-message">{formErrors.deliverypersonEmail}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonGender ? 'has-error' : ''}
                  id="deliverypersonGender"
                  name="deliverypersonGender"
                  value={formData.deliverypersonGender}
                  onChange={handleChange}
                          >
                 <option value="">Select Gender</option>
                 <option value="Male">Male</option>
                 <option value="Female">Female</option>
                 <option value="Unspecified">Unspecified</option>
                </Form.Select>
                {formErrors.deliverypersonGender && (
                  <div className="error-message">{formErrors.deliverypersonGender}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>NIC Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonNIC ? 'has-error' : ''}
                  type="text"
            id="deliverypersonNIC"
            name="deliverypersonNIC"
            value={formData.deliverypersonNIC}
            onChange={handleChange}
                />
                {formErrors.deliverypersonNIC && (
                  <div className="error-message">{formErrors.deliverypersonNIC}</div>
                )}
              </Form.Group>
            </Row>
            
            

              <Form.Label>Address</Form.Label>

              <Form.Control
                className={formErrors.deliverypersonAddress ? 'has-error' : ''}
                type="text"
            id="deliverypersonAddress"
            name="deliverypersonAddress"
            value={formData.deliverypersonAddress}
            onChange={handleChange}
              />
              {formErrors.deliverypersonAddress && (
                  <div className="error-message">{formErrors.deliverypersonAddress}</div>
                )}


            
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Driving License Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDLN ? 'has-error' : ''}
                    type="text"
                   id="deliverypersonDLN"
                   name="deliverypersonDLN"
                   value={formData.deliverypersonDLN}
                   onChange={handleChange}
                />
                {formErrors.deliverypersonDLN && (
                  <div className="error-message">{formErrors.deliverypersonDLN}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>DL Expire Date</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonDLexpire ? 'has-error' : ''}
                  type="date"
                  id="deliverypersonDLexpire"
                  name="deliverypersonDLexpire"
                  value={formData.deliverypersonDLexpire}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonDLexpire && (
                  <div className="error-message">{formErrors.deliverypersonDLexpire}</div>
                )}
              </Form.Group>
            </Row>
            <Form.Group as={Col}>
            <Form.Label>Image</Form.Label>
               <Form.Control
                  type="file"
                   name="image"
                   onChange={handleChange}
                  />
               </Form.Group>
            
            <Row className="mb-3">
              
              

                <Form.Group as={Col}>
                <Form.Label>Select Delivery Vehicle Type</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonVehicleType ? 'has-error' : ''}
                  id="deliverypersonVehicleType"
                name="deliverypersonVehicleType"
                value={formData.deliverypersonVehicleType}
                onChange={handleChange}
               >
                
                <option value="">Select Delivery Vehicle Type</option>
               <option value="Bike">Bike</option>
               <option value="Three wheel">Three wheel</option>
                <option value="Lorry">Lorry</option>
                </Form.Select>
                {formErrors.deliverypersonVehicleType && (
                  <div className="error-message">{formErrors.deliverypersonVehicleType}</div>
                )}
                </Form.Group>

                 <Form.Group as={Col}>
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonVehicleNumber ? 'has-error' : ''}
                  type="text"
                  id="deliverypersonVehicleNumber"
                  name="deliverypersonVehicleNumber"
                  value={formData.deliverypersonVehicleNumber}
                  onChange={handleChange}
                />
                {formErrors.deliverypersonVehicleNumber && (
                  <div className="error-message">{formErrors.deliverypersonVehicleNumber}</div>
                )}
                </Form.Group>
               </Row>
               <Row className="mb-3">
              
                <Form.Group as={Col}>
                <Form.Label>Working Branch</Form.Label>
                <Form.Select
                  className={formErrors.deliverypersonBranch ? 'has-error' : ''}
                  id="deliverypersonBranch"
            name="deliverypersonBranch"
            value={formData.deliverypersonBranch}
            onChange={handleChange}
            >
            <option value="">Select Branch</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Ibbagamuwa main">Ibbagamuwa_main</option>
            <option value="Colombo">Colombo</option>
            <option value="Galle">Galle</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Batticaloa">Batticaloa</option>
                </Form.Select>
                {formErrors.deliverypersonBranch && (
                  <div className="error-message">{formErrors.deliverypersonBranch}</div>
                )}
              </Form.Group>

              
              
            </Row>

            <br />
            <h2>
              <b>Delivery person Login Cradintial</b>
            </h2>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  className={formErrors.deliverypersonUsername ? 'has-error' : ''}
                  type="text"
            id="deliverypersonUsername"
            name="deliverypersonUsername"
            value={formData.deliverypersonUsername}
            onChange={handleChange}
                />
                {formErrors.deliverypersonUsername && (
                  <div className="error-message">{formErrors.deliverypersonUsername}</div>
                )}
              </Form.Group>

              <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={formErrors.deliverypersonPassword ? 'has-error' : ''}
              type="password"
              id="deliverypersonPassword"
              name="deliverypersonPassword"
              value={formData.deliverypersonPassword}
              onChange={handlePasswordChange}
              onClick={handlePasswordClick}
              onBlur={handleFieldClick}
            />
            {showPasswordConditions && (
              <div className="password-conditions">
                <div className="password-condition" style={{ color: passwordValidation.lowercase ? 'green' : 'red' }}>
                  <span className="condition-icon">&#x2713;</span>
                  <span className="condition-text">At least one lowercase letter</span>
                </div>
                <div className="password-condition" style={{ color: passwordValidation.uppercase ? 'green' : 'red' }}>
                  <span className="condition-icon">&#x2713;</span>
                  <span className="condition-text">At least one uppercase letter</span>
                </div>
                <div className="password-condition" style={{ color: passwordValidation.number ? 'green' : 'red' }}>
                  <span className="condition-icon">&#x2713;</span>
                  <span className="condition-text">At least one number</span>
                </div>
                <div className="password-condition" style={{ color: passwordValidation.symbol ? 'green' : 'red' }}>
                  <span className="condition-icon">&#x2713;</span>
                  <span className="condition-text">At least one symbol</span>
                </div>
              </div>
            )}
            {formErrors.deliverypersonPassword && (
              <div className="error-message">{formErrors.deliverypersonPassword}</div>
            )}
          </Form.Group>
            </Row>

            <br />

            <Button
              className="btn"
              size="lg"
              variant="danger outline-dark"
              type="submit"
              style={{
                marginLeft: "500px",
                width: "250px",
                height: "55px",
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryForm;

