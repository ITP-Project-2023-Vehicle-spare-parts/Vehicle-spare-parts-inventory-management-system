import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AvailableDeliveryPersonList.css'

function AvailableDeliveryPersonList({ navigateToOrderList }) {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const { orderid, userid } = useParams();

  useEffect(() => {
    // Fetch the list of delivery persons from your API
    axios.get('http://localhost:8000/deliveryPerson/')
      .then((response) => {
        setDeliveryPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRadioChange = (deliveryPersonID) => {
    setSelectedDeliveryPerson(deliveryPersonID);
  };

  const handleAssignDelivery = () => {
    var id = selectedDeliveryPerson;
    if (id) {
      axios.put(`http://localhost:8000/deliveryPerson/update/${id}`, {
        personStatus: "not-availabe"
      })
      .then((response) => {
        alert('Status updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating :', error);
      });
    } else {
      console.error('ID is undefined, cannot update status.');
    }

    //console.log('ID:', id);


    axios.post('http://localhost:8000/deliveryOrder/adddeliveryOrderController', {
      orderid: orderid,
      deliveryPersonID: selectedDeliveryPerson,
      userID: userid,
    })
    .then((response) => {
      console.log('Delivery order added successfully.');
      window.location.href = '/admin/orders/';
    })
    .catch((error) => {
      console.error('Error adding delivery order:', error);
    });

    axios.put(`http://localhost:8000/allOrder/updateStatus/${orderid}`, {
      orderStatus: "delivery person assign"
    })
    .then((response) => {
      alert('Status updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating :', error);
    });
  };

  return (
    
    <div id='Available-delivery' className="container mt-4">
    <h2>Delivery Persons List</h2>
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Delivery Person ID</th>
          <th>User Name</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th>Vehicle Number</th>
          <th>Working Branch</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {deliveryPersons.map((deliveryPerson) => (
          <tr key={deliveryPerson._id}>
            <td>{deliveryPerson._id}</td>
            <td>{deliveryPerson.DeliveryPersonID}</td>
            <td>{deliveryPerson.deliverypersonUsername}</td>
            <td>{deliveryPerson.deliverypersonContactNumber}</td>
            <td>{deliveryPerson.deliverypersonEmail}</td>
            <td>{deliveryPerson.deliverypersonVehicleNumber}</td>
            <td>{deliveryPerson.deliverypersonBranch}</td>
            <td>
              <input
                type="radio"
                name="deliveryPerson"
                value={deliveryPerson._id}
                onChange={() => handleRadioChange(deliveryPerson._id)}
                checked={selectedDeliveryPerson === deliveryPerson._id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button
      className="btn btn-primary"
      onClick={handleAssignDelivery}
    >
      Assign
    </button>
  </div>
  
  );
}

export default AvailableDeliveryPersonList;
