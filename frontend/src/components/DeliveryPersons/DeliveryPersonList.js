// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function DeliveryPersonList({ orderId }) {
//   const [deliveryPersons, setDeliveryPersons] = useState([]);
//   const [selectedDeliveryPersons, setSelectedDeliveryPersons] = useState([]);

//   useEffect(() => {
//     // Fetch available delivery persons from your API
//     axios.get('http://localhost:8000/deliveryPersons')
//       .then((response) => {
//         setDeliveryPersons(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching delivery persons:', error);
//       });
//   }, []);

//   const handleCheckboxChange = (deliveryPersonId) => {
//     // Toggle selection of delivery person
//     if (selectedDeliveryPersons.includes(deliveryPersonId)) {
//       setSelectedDeliveryPersons(selectedDeliveryPersons.filter((id) => id !== deliveryPersonId));
//     } else {
//       setSelectedDeliveryPersons([...selectedDeliveryPersons, deliveryPersonId]);
//     }
//   };

//   const handleAssignClick = () => {
//     // Assign selected delivery persons to the order
//     axios.post(`http://localhost:8000/orders/assign/${orderId}`, {
//       deliveryPersonIds: selectedDeliveryPersons,
//     })
//     .then((response) => {
//       // Handle success (e.g., update the UI)
//       console.log('Order assigned successfully:', response.data);

//       // Redirect to the order list page or perform any other necessary actions
//     })
//     .catch((error) => {
//       console.error('Error assigning delivery persons to the order:', error);
//     });
//   };

//   return (
//     <div>
//       <h2>Available Delivery Persons</h2>
//       <table>
//         {/* ... Table header and rows as before */}
//       </table>
//       <button onClick={handleAssignClick}>Assign Delivery Persons</button>
//     </div>
//   );
// }

// export default DeliveryPersonList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AvailableDeliveryPersonList({ navigateToOrderList }) {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [selectedDeliveryPersons, setSelectedDeliveryPersons] = useState([]);
  const { orderId } = useParams();

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

  // Function to handle checkbox selection
  const handleCheckboxChange = (deliveryPersonID) => {
    // Toggle the selected state of the delivery person
    setSelectedDeliveryPersons((prevSelected) => {
      if (prevSelected.includes(deliveryPersonID)) {
        return prevSelected.filter((id) => id !== deliveryPersonID);
      } else {
        return [...prevSelected, deliveryPersonID];
      }
    });
  };

  // Function to handle the "Assign" button click
  const handleAssignDelivery = () => {
    // Make an API request to assign delivery persons and update order status
    axios.post(`http://localhost:8000/order/assign/${orderId}`, {
      selectedDeliveryPersons,
      newOrderStatus: 'process', // Change the order status to "process"
    })
    .then((response) => {
      // Handle the response or perform any other actions
      console.log('Delivery persons assigned successfully.');

      // Navigate to the OrderList page by changing the URL
      window.location.href = '/admin/orders'; // Change this URL to your OrderList page URL
    })
    .catch((error) => {
      console.error('Error assigning delivery persons:', error);
    });
  };

  return (
    <div>
      <h2>Delivery Persons List</h2>
      <table>
        <thead>
          <tr>
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
            <tr key={deliveryPerson.DeliveryPersonID}>
              <td>{deliveryPerson.DeliveryPersonID}</td>
              <td>{deliveryPerson.deliverypersonUsername}</td>
              <td>{deliveryPerson.deliverypersonContactNumber}</td>
              <td>{deliveryPerson.deliverypersonEmail}</td>
              <td>{deliveryPerson.deliverypersonVehicleNumber}</td>
              <td>{deliveryPerson.deliverypersonBranch}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(deliveryPerson.DeliveryPersonID)}
                  checked={selectedDeliveryPersons.includes(deliveryPerson.DeliveryPersonID)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAssignDelivery}>Assign</button>
    </div>
  );
}

export default AvailableDeliveryPersonList;
