import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./DeliveryTable.css";
import "boxicons/css/boxicons.min.css";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function DeliveryTable() {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const { id } = useParams();
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    // Fetch the list of delivery persons from your API
    axios
      .get("http://localhost:8000/deliveryPerson/")
      .then((response) => {
        setDeliveryPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);


  function DeleteDeliveryPerson(id) {
    Swal.fire({
      title: "Delete Delivery Person",
      text: "Are you sure you want to delete this delivery person?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="bx bx-trash"></i> Yes, delete it',
      cancelButtonText: '<i class="bx bx-x"></i> Cancel',
      customClass: {
        container: "swal-container",
        popup: "swal-popup",
        header: "swal-header",
        title: "swal-title",
        text: "swal-text",
        confirmButton: "swal-confirm-button swal-confirm-button-custom",
        cancelButton: "swal-cancel-button swal-cancel-button-custom",
      },
      buttonsStyling: false,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      confirmButtonClass: 'swal-confirm-button-custom', 
      cancelButtonClass: 'swal-cancel-button-custom', 
      preConfirm: () => {
        return axios
          .delete(`http://localhost:8000/deliveryPerson/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "The delivery person has been deleted.", "success");
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire("Error!", "Unable to delete the delivery person.", "error");
          });
      },
    });
  }

  function generateReport() {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    // Define table columns and their widths
    const columns = ["User Name", "Contact Number", "Email"];
    const colWidths = [60, 40, 80]; // Adjust column widths as needed

    // Define table header styles
    const headerStyle = { fillColor: "#007bff", textColor: "#ffffff" }; // Header background color: blue
    const cellStyle = { textColor: "#000000" }; // Cell text color: black

    // Add an image to the PDF
    const img = new Image();
    img.src = "/images/CMLogo.png"; // Replace with the actual image path
    pdfDoc.addImage(img, "PNG", 10, 10, 40, 40);

    // Add additional text or content to the PDF
    pdfDoc.text("Delivery Person Report", 60, 30);


    // Create a table
    pdfDoc.autoTable({
      head: [columns], // Table header
      body: deliveryPersons.map((dataobj) => [
        dataobj.deliverypersonUsername,
        dataobj.deliverypersonContactNumber,
        dataobj.deliverypersonEmail,
  
        // Add more fields as needed
      ]),
      startY: 60, // Adjust the vertical position of the table
      styles: {
        textColor: cellStyle.textColor,
        valign: "middle",
        halign: "center",
      },
      columnStyles: { 0: { cellWidth: colWidths[0] }, 1: { cellWidth: colWidths[1] }, 2: { cellWidth: colWidths[2] }},
      headStyles: { fillColor: headerStyle.fillColor, textColor: headerStyle.textColor },
      theme: "grid", // "striped", "grid", or "plain"
    });

    // Add signature
    pdfDoc.text(".....................................", 10, pdfDoc.internal.pageSize.height - 15);
    pdfDoc.text("Signature of manager", 10, pdfDoc.internal.pageSize.height - 10);

    // Add address
    pdfDoc.setFontSize(10);
    pdfDoc.text("56", pdfDoc.internal.pageSize.width - 60, 10);
    pdfDoc.text("Ibbagamuwa", pdfDoc.internal.pageSize.width - 60, 15);
    pdfDoc.text("kurunegala", pdfDoc.internal.pageSize.width - 60, 20);
    pdfDoc.text("+94123456789", pdfDoc.internal.pageSize.width - 60, 27);
    pdfDoc.text(`${formattedDate}`, 150, 30);

    // Save or download the PDF
    pdfDoc.save("delivery_report.pdf");
}


  
  
  

  return (
    <div id="AllDeliveryPerson">
      <body className="container">
        <main className="table">
          <section className="table__header">
            <h1>Deliver Person's Details</h1>
            <div className="search-container">
              <input
                type="search"
                id="search-input"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
              />
            </div>
            <div className="table__buttons">
              <Link to="/admin/DeliveryPerson-add" className="btn btn-primary">
                Add Delivery Person
              </Link>
              <button className="btn btn-secondary" onClick={generateReport}>
                Generate Report
              </button>
            </div>
          </section>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Vehicle Number</th>
                  <th>Working Branch</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {deliveryPersons
                  .filter((dataobj) => {
                    const lowerCaseSearch = search.toLowerCase();
                    const lowerCasedeliverypersonUsername =
                      dataobj.deliverypersonUsername.toLowerCase();
                    const lowerCasedeliverypersonBranch =
                      dataobj.deliverypersonBranch.toLowerCase();
                    const lowerCasedeliverypersonEmail =
                      dataobj.deliverypersonEmail.toLowerCase();
                    const deliverypersonVehicleNumber =
                      dataobj.deliverypersonVehicleNumber;
                    const DeliveryPersonID = dataobj.DeliveryPersonID;
                    const deliverypersonContactNumber =
                      dataobj.deliverypersonContactNumber;

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
                  .map((dataobj) => (
                    <tr key={dataobj._id}>
                      <td>{dataobj.deliverypersonUsername}</td>
                      <td>{dataobj.deliverypersonContactNumber}</td>
                      <td>{dataobj.deliverypersonEmail}</td>
                      <td>{dataobj.deliverypersonVehicleNumber}</td>
                      <td>
  {dataobj.deliverypersonBranch ? dataobj.deliverypersonBranch : ''}
</td>
                      <td style={{ marginLeft: "auto" }}>
                        <button
                          className="bx bx-trash btn btn-outline-danger icon-lg"
                          style={{ margin: "1px" }}
                          onClick={() => DeleteDeliveryPerson(dataobj._id)}
                        ></button>
                        <Link to={"/admin/profile/" + dataobj.DeliveryPersonID}>
                          <button
                            className="bx bx-info-circle btn btn-outline-primary icon-lg"
                            style={{ margin: "5px" }}
                          ></button>
                        </Link>
                        <Link to={`/admin/delivery/profiles/${dataobj._id}`}>
                          <button
                            className="btn btn-outline-warning"
                            style={{ margin: "2px" }}
                          >
                            <i
                              className="bx bx-pencil"
                              style={{ fontSize: "1rem" }}
                            ></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </main>
      </body>
    </div>
  );
}

export default DeliveryTable;
