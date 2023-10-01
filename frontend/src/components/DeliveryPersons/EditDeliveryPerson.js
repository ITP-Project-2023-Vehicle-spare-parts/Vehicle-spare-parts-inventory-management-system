import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditDeliveryPersonProfile.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function EditDeliveryPerson() {
  const { id } = useParams();
  const [deliveryPerson, setDeliveryPerson] = useState({
    deliverypersonname: '',
    deliverypersonGender: '',
    // Add other form fields here
  });

  useEffect(() => {
    // Fetch the delivery person's details from your API
    axios
      .get(`http://localhost:8000/deliveryPerson/getById/${id}`)
      .then((response) => {
        const data = response.data;
        // Check if the 'DeliveryPersons' object exists and contains 'deliverypersonname'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the state using a callback function
    setDeliveryPerson((prevDeliveryPerson) => ({
      ...prevDeliveryPerson,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send an HTTP PUT request to update the data on the server
    axios
      .put(`http://localhost:8000/deliveryPerson/update/${id}`, deliveryPerson)
      .then((response) => {
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
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

        {/* Additional form elements with custom styles */}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          >
            <option value="">Select Branch</option>
            <option value="Galle">Galle</option>
            <option value="Batticaloa">Batticaloa</option>
            <option value="Nuwara Eliya">Nuwara Eliya</option>
            <option value="Ibbagaumuwa">Ibbagaumuwa</option>
            <option value="Jaffna">Jaffna</option>
          </select>
        </div>

        {/* Add similar input fields with custom styles for other form properties */}
        
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
