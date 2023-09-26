import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfileDetails() {
  const { deliveryPersonID } = useParams();
  const [deliveryPerson, setDeliveryPerson] = useState(null);

  useEffect(() => {
    // Fetch the profile details of the selected delivery person by ID
    axios.get("http://localhost:8000/deliveryPerson/get/"+deliveryPersonID)
      .then((response) => {
        console.log(response.data)
        setDeliveryPerson(response.data.DeliveryPersons);
      })
      .catch((error) => {
        console.error('Error fetching profile details:', error);
      });
  }, [deliveryPersonID]);

  if (!deliveryPerson) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View Profile</h2>
      <p>Delivery Person ID: {deliveryPerson.DeliveryPersonID}</p>
      <p>User Name: {deliveryPerson.deliverypersonUsername}</p>
      <p>Name: {deliveryPerson.deliverypersonname}</p>
      <p>Gender: {deliveryPerson.deliverypersonGender}</p>
      <p>Birth Of Date: {deliveryPerson.deliverypersonDOB}</p>
      <p>Contact Number: {deliveryPerson.deliverypersonContactNumber}</p>
      <p>Email: {deliveryPerson.deliverypersonEmail}</p>
      <p>NIC: {deliveryPerson.deliverypersonNIC}</p>
      <p>Address: {deliveryPerson.deliverypersonAddress}</p>
      <p>Driving License Number: {deliveryPerson.deliverypersonDLN}</p>
      <p>DL Expire date: {deliveryPerson.deliverypersonDLexpire}</p>
      <p>Experience: {deliveryPerson.deliverypersonExperience}</p>
      <p>Vehicle Number: {deliveryPerson.deliverypersonVehicleType}</p>
      <p>Vehicle Type: {deliveryPerson.deliverypersonVehicleNumber}</p>
      <p>Branch: {deliveryPerson.deliverypersonBranch}</p>    

      {/* Display other profile details */}
    </div>
  );
}

export default ProfileDetails;
