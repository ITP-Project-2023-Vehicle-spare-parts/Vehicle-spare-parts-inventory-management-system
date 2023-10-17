import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditDeliveryPersonProfile.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import toast from 'react-hot-toast';

function EditDeliveryPerson() {
  const { id } = useParams();
  const [formData, setFormData] = useState({})

  const [deliveryPerson, setDeliveryPerson] = useState({
    deliverypersonname: '',
    deliverypersonGender: '',

  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch the delivery person's details from your API
    axios
      .get(`http://localhost:8000/deliveryPerson/getById/${id}`)
      .then((response) => {
        const data = response.data;
        if (data.DeliveryPersons && data.DeliveryPersons.DeliveryPersonID) {
          setDeliveryPerson(data.DeliveryPersons);
        } else {
          console.error('Delivery person name not found in the API response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = (e) => {

    const { name, value } = e.target;
    let errors = { ...formErrors };

    // Validate Delivery Person ID
    if (!deliveryPerson.DeliveryPersonID) {
      errors.DeliveryPersonID = 'Delivery Person ID is required';
    }

    // Validate Full Name
    if (!deliveryPerson.deliverypersonname) {
      errors.deliverypersonname = 'Full Name is required';
    } else if (!/^\S+(\s+\S+)+$/.test(deliveryPerson.deliverypersonname)) {
      errors.deliverypersonname = 'Please enter the full name';
    }

    // Validate Date of Birth
    if (!deliveryPerson.deliverypersonDOB) {
      errors.deliverypersonDOB = 'Date of Birth is required';
    }

    if (!deliveryPerson.deliverypersonContactNumber) {
      errors.deliverypersonContactNumber = 'Contact Number is required';
    } else if (!/^\d+$/.test(deliveryPerson.deliverypersonContactNumber)) {
      errors.deliverypersonContactNumber = 'Contact Number must be numeric';
    }
    const limitedNumericValue = deliveryPerson.deliverypersonContactNumber;

    if (limitedNumericValue.length !== 10) {
      errors.deliverypersonContactNumber = 'Contact Number must be exactly 10 digits';
    } else {
      delete errors.deliverypersonContactNumber;
    }


    // Validate Email
    if (!deliveryPerson.deliverypersonEmail) {
      errors.deliverypersonEmail = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(deliveryPerson.deliverypersonEmail)) {
      errors.deliverypersonEmail = 'Email is invalid';
    }
    if (!deliveryPerson.deliverypersonGender) {
      errors.deliverypersonGender = 'Gender is required';
    }
    if (!deliveryPerson.deliverypersonNIC) {
      errors.deliverypersonNIC = 'NIC is required';
    }
    if (!deliveryPerson.deliverypersonAddress) {
      errors.deliverypersonAddress = 'Address is required';
    }
    if (!deliveryPerson.deliverypersonDLN) {
      errors.deliverypersonDLN = 'Driving license number is required';
    }
    if (!deliveryPerson.deliverypersonDLexpire) {
      errors.deliverypersonDLexpire = 'DL Expire is required';
    }
    if (!deliveryPerson.deliverypersonVehicleType) {
      errors.deliverypersonVehicleType = 'Vehicle type is required';
    }
    if (!deliveryPerson.deliverypersonUsername) {
      errors.deliverypersonUsername = 'User name is required';
    }
    if (!deliveryPerson.deliverypersonPassword) {
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

  const handleInputChange = (e) => {
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
    setDeliveryPerson({ ...deliveryPerson, [name]: value }); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(e);
  
    if (isValid) {
      try {
        // Send a PUT request to your API endpoint
        await axios.put(`http://localhost:8000/deliveryPerson/update/${id}`, deliveryPerson);
  
        toast.success("Successfully update Delivery Person!", {
          duration: 3000,
          position: "top-right",
        });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };


  return (
  //  
  <div id='EditDeliveryPerson' className="container mt-5">
  <div className="card">
    <div className="card-header">
      Edit Delivery Person Profile
    </div>
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deliverypersonname">Name</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonname"
            name="deliverypersonname"
            value={deliveryPerson.deliverypersonname}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonGender">Gender</label>
          <select
            className="form-control select-blue"
            id="deliverypersonGender"
            name="deliverypersonGender"
            value={deliveryPerson.deliverypersonGender}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unspecified">Unspecified</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deliverypersonDOB">Date of Birth</label>
          <input
            type="date"
            className="form-control input-blue"
            id="deliverypersonDOB"
            name="deliverypersonDOB"
            value={deliveryPerson.deliverypersonDOB}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliverypersonContactNumber">Contact Number</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonContactNumber"
            name="deliverypersonContactNumber"
            value={deliveryPerson.deliverypersonContactNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliverypersonEmail">Email</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonEmail"
            name="deliverypersonEmail"
            value={deliveryPerson.deliverypersonEmail}
            onChange={handleInputChange}
            onBlur={handleBlur}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="deliverypersonNIC">NIC number</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonNIC"
            name="deliverypersonNIC"
            value={deliveryPerson.deliverypersonNIC}
            onChange={handleInputChange}
            style={{ cursor: 'not-allowed' }}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonNIC">Address</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonAddress"
            name="deliverypersonAddress"
            value={deliveryPerson.deliverypersonAddress}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonNIC">Driving license number</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonDLN"
            name="deliverypersonDLN"
            value={deliveryPerson.deliverypersonDLN}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonNIC">Driving license expire date</label>
          <input
            type="date"
            className="form-control input-blue"
            id="deliverypersonDLexpire"
            name="deliverypersonDLexpire"
            value={deliveryPerson.deliverypersonDLexpire}
            onChange={handleInputChange}
            onBlur={handleBlur}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonGender">Vehicle type</label>
          <select
            className="form-control select-blue"
            id="deliverypersonVehicleType"
            name="deliverypersonVehicleType"
            value={deliveryPerson.deliverypersonVehicleType}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          >
            <option value="">Select Vehicle</option>
            <option value="Male">Bike</option>
            <option value="Female">Three wheel</option>
            <option value="Unspecified">Lorry</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonNIC">Vehicle number</label>
          <input
            type="text"
            className="form-control input-blue"
            id="deliverypersonVehicleNumber"
            name="deliverypersonVehicleNumber"
            value={deliveryPerson.deliverypersonVehicleNumber}
            onChange={handleInputChange}
            readOnly
            style={{ cursor: 'not-allowed' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliverypersonBranch">Branch</label>
          <select
            className="form-control select-blue"
            id="deliverypersonBranch"
            name="deliverypersonBranch"
            value={deliveryPerson.deliverypersonBranch}
            // onChange={handleInputChange}
          >
            <option value="">Select Branch</option>
            <option value="Galle">Galle</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="ibbagamuwa_main">Ibbagaumuwa</option>
            <option value="Jaffna">Jaffna</option>
            <option value="colombo">Colombo</option>
          </select>
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}

export default EditDeliveryPerson;
