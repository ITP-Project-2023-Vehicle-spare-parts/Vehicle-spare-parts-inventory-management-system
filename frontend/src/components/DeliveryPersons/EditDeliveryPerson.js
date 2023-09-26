import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h2>Edit Delivery Person Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deliverypersonname">Name</label>
          <input
            type="text"
            id="deliverypersonname"
            name="deliverypersonname"
            value={deliveryPerson.deliverypersonname} // Populate the input with the name
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonGender">Gender</label>
          <select
            id="deliverypersonGender"
            name="deliverypersonGender"
            value={deliveryPerson.deliverypersonGender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unspecified">Unspecified</option>
          </select>
        </div>
        <div>
          <label htmlFor="deliverypersonDOB">Date of Birth</label>
          <input
            type="date"
            id="deliverypersonDOB"
            name="deliverypersonDOB"
            value={deliveryPerson.deliverypersonDOB}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="deliverypersonContactNumber">Contact Number</label>
          <input
            type="text"
            id="deliverypersonContactNumber"
            name="deliverypersonContactNumber"
            value={deliveryPerson.deliverypersonContactNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonEmail">Email</label>
          <input
            type="text"
            id="deliverypersonEmail"
            name="deliverypersonEmail"
            value={deliveryPerson.deliverypersonEmail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonNIC">NIC number</label>
          <input
            type="text"
            id="deliverypersonNIC"
            name="deliverypersonNIC"
            value={deliveryPerson.deliverypersonNIC}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonAddress">Adress</label>
          <input
            type="text"
            id="deliverypersonAddress"
            name="deliverypersonAddress"
            value={deliveryPerson.deliverypersonAddress}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonDLN">Driving License Number</label>
          <input
            type="text"
            id="deliverypersonDLN"
            name="deliverypersonDLN"
            value={deliveryPerson.deliverypersonDLN}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonDLexpire">Expire date of driving license</label>
          <input
            type="date"
            id="deliverypersonDLexpire"
            name="deliverypersonDLexpire"
            value={deliveryPerson.deliverypersonDLexpire}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonExperience">Experience</label>
          <input
            type="text"
            id="deliverypersonExperience"
            name="deliverypersonExperience"
            value={deliveryPerson.deliverypersonExperience}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonVehicleType">Working vehicle type</label>
          <select
            id="deliverypersonVehicleType"
            name="deliverypersonVehicleType"
            value={deliveryPerson.deliverypersonVehicleType}
            onChange={handleInputChange}
          >
            <option value="">Select Vehicle</option>
            <option value="Branch A">Bike</option>
            <option value="Branch B">Three wheel</option>
            <option value="Branch C">Lorry</option>
          </select>
        </div>
        <div>
          <label htmlFor="deliverypersonVehicleNumber">Vehicle Number</label>
          <input
            type="text"
            id="deliverypersonVehicleNumber"
            name="deliverypersonVehicleNumber"
            value={deliveryPerson.deliverypersonVehicleNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonBranch">Branch</label>
          <select
            id="deliverypersonBranch"
            name="deliverypersonBranch"
            value={deliveryPerson.deliverypersonBranch}
            onChange={handleInputChange}
          >
            <option value="">Select Branch</option>
            <option value="Branch A">Branch A</option>
            <option value="Branch B">Branch B</option>
            <option value="Branch C">Branch C</option>
          </select>
        </div>
        <div>
          <label htmlFor="deliverypersonUsername">User Name</label>
          <input
            type="text"
            id="deliverypersonUsername"
            name="deliverypersonUsername"
            value={deliveryPerson.deliverypersonUsername}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonPassword">Password</label>
          <input
            type="password"
            id="deliverypersonPassword"
            name="deliverypersonPassword"
            value={deliveryPerson.deliverypersonPassword}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="deliverypersonReEnter">Re-Enter Password</label>
          <input
            type="password"
            id="deliverypersonReEnter"
            name="deliverypersonReEnter"
            value={deliveryPerson.deliverypersonReEnter}
            onChange={handleInputChange}
          />
        </div>
        {/* Add similar input fields for other form properties */}
        <div>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default EditDeliveryPerson;
