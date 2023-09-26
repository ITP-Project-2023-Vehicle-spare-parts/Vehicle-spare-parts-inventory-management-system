import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./DeliveryTable.css";
import "boxicons/css/boxicons.min.css";
import Swal from "sweetalert2";

function DeliveryTable() {
    const [deliveryPersons, setDeliveryPersons] = useState([]);
    const { id } = useParams();
    const [search, setSearch] = useState("");
  console.log(search);

    useEffect(() => {
        // Fetch the list of delivery persons from your API
        axios.get('http://localhost:8000/deliveryPerson/')
          .then((response) => {
            setDeliveryPersons(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, [id]);

// const handleDelete = (id) => {
//     // Display a confirmation dialog
//     const isConfirmed = window.confirm('Are you sure you want to delete this delivery person?');

//     if (isConfirmed) {
//       // Send a DELETE request to your API endpoint
//       axios
//         .delete(`http://localhost:8000/deliveryPerson/delete/${id}`)
//         .then((response) => {
//           // Update the state to remove the deleted delivery person
//           setDeliveryPersons(deliveryPersons.filter((person) => person._id !== id));
//           alert('Delivery Person deleted successfully!');
//         })
//         .catch((error) => {
//           console.error('Error deleting delivery person:', error);
//         });
//     }
//   };
function DeleteDeliveryPerson(id) {
  console.log(id);

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8000/deliveryPerson/delete/${id}`);
      window.location.reload();

      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });}

  return (
    <div id="AllDeliveryPerson">
      <body className="AllDeliveryPerson">
        <main class="table">
          <section class="table__header">
            <h1>Deliver Person's Details</h1>
            <div class="input-group">
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
              />
            </div>
            {/* <Link to="/Admin/DeliveryPerson/add">
              <Button variant="outline-primary" size="lg">
                Add Delivery Person
              </Button>
            </Link> */}
            <div class="export__file">
              <label
                for="export-file"
                class="export__file-btn"
                title="Export File"
              >
                <i className="bx bx-menu"></i>
              </label>
              <input type="checkbox" id="export-file" />
              <div class="export__file-options">
                <label>Export As &nbsp; &#10140;</label>
                <label for="export-file" id="toPDF">
                  PDF <img src="/images/pdf.png" alt="" />
                </label>
              </div>
            </div>
          </section>
          <section class="table__body">
            <table>
              <thead>
                <tr>
                  <th>Delivery Person ID</th>
                  <th> User Name </th>
                  <th> Contact Number </th>
                  <th> Email</th>
                  <th> Vehicle Number </th>
                  <th> Working Branch</th>
                </tr>
              </thead>

              {deliveryPersons
                .filter((dataobj) => {
                  const lowerCaseSearch = search.toLowerCase();
                  const lowerCasedeliverypersonUsername =
                    dataobj.deliverypersonUsername.toLowerCase();
                  const lowerCasedeliverypersonBranch =
                    dataobj.deliverypersonBranch.toLowerCase();
                  const lowerCasedeliverypersonEmail =
                    dataobj.deliverypersonEmail.toLowerCase();
                  const deliverypersonVehicleNumber = dataobj.deliverypersonVehicleNumber;
                  const DeliveryPersonID = dataobj.DeliveryPersonID;
                  const deliverypersonContactNumber = dataobj.deliverypersonContactNumber;

                  return (
                    lowerCaseSearch === "" ||
                    lowerCasedeliverypersonUsername.includes(lowerCaseSearch) ||
                    lowerCasedeliverypersonBranch.includes(lowerCaseSearch) ||
                    lowerCasedeliverypersonEmail.includes(lowerCaseSearch) ||
                    deliverypersonVehicleNumber === search ||
                    DeliveryPersonID === search ||
                    deliverypersonContactNumber === search
                  );
                })
                .map((dataobj) => {
                  return (
                    <tbody>
                      <tr key={dataobj._id}>
                        
                          
                          
                        <td>{dataobj.DeliveryPersonID}</td>
                        <td>{dataobj.deliverypersonUsername}</td>         
                        <td> {dataobj.deliverypersonContactNumber} </td>
                        <td>{dataobj.deliverypersonEmail}</td>
                        <td>{dataobj.deliverypersonVehicleNumber}</td>
                        <td>{dataobj.deliverypersonBranch}</td>
                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteDeliveryPerson(dataobj._id)}
                          ></button>
                          {/* <button
                            className="bx bx-info-circle bx-lg btn btn-outline-primary"
                            style={{ margin: "10px" }}>
                            <Link to={"/profile/"+dataobj.DeliveryPersonID}></Link>
                          </button> */}
                          <Link to={"/Admin/profile/" + dataobj.DeliveryPersonID}>
                               <button className="bx bx-info-circle bx-lg btn btn-outline-primary" style={{ margin: "10px" }}>
                                   {/* Content of your button */}
                               </button>
                           </Link>

                           <Link to={`/Admin/profile/update/${dataobj._id}`}>
                                 <button className="bx bx-pencil bx-lg btn btn-outline-warning" style={{ margin: "10px" }}>
                                 {/* Content of your button */}
                                 </button>
                            </Link>

                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </section>
        </main>
      </body>
    </div>
  );
}







export default DeliveryTable;
