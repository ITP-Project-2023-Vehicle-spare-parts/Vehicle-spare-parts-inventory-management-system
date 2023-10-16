import Button from "react-bootstrap/esm/Button";
import "./AllClient.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jspdf-autotable
import toast from "react-hot-toast";

export default function AllClient() {
  const [clients, setClient] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    function getClient() {
      axios
        .get("http://localhost:8000/clients/", getClient)
        .then((res) => {
          console.log(res.data);
          setClient(res.data);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getClient();
  }, []);

  function DeleteClient(id) {
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
        axios.delete("http://localhost:8000/clients/delete/" + id);
        window.location.reload();

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add the logo
    const logoURL = "/images/CMLogo.png";
    pdf.addImage(logoURL, "PNG", 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed

    // Set font styles
    pdf.setFont("helvetica");
    pdf.setFontSize(16);

    // Add a title
    pdf.text("Client Report - CMspare", 70, 20);

    // Create a table for client data
    const tableData = clients.map((dataobj, index) => {
      return [
        `${dataobj.ClientsfirstName} ${dataobj.ClientsLastName}`,
        dataobj.ClientsCity,
        dataobj.ClientsStatus,
        dataobj.SystemEmail,
        dataobj.NoOfBranches,
      ];
    });

    const tableHeaders = [
      "Client Name",
      "Address",
      "Status",
      "System Email",
      "No Of Branches",
    ];

    // Set the table style
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Text color (black)

    // Define the column widths and row heights

    // Add the table
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 40, // Adjust the vertical position
      margin: { horizontal: 10 },
      columnStyles: { 0: { cellWidth: 50 } }, // Adjust the column width
      bodyStyles: { valign: "middle" }, // Vertical alignment for cell content
      columnWidth: "wrap",
    });

    let currentYPosition = pdf.lastAutoTable.finalY + 20; // Get the Y position of the last table row + 20 for padding

    // Add shop address
    pdf.setFontSize(14);
    pdf.text("Shop Address:Ibbagamuwa", 10, currentYPosition);

    const shopAddress = [
      "Chathura Moters (CM Spare)",
      "Dambulla road",
      "City : Dabulla, 60500",
      "Phone: (+94)91 2245891",
      "Email: chathuraspares@gmail.com ",
    ];
    currentYPosition += 10; // Initial space before first address line

    shopAddress.forEach((line) => {
      pdf.text(line, 10, currentYPosition);
      currentYPosition += 10;
    });

    currentYPosition += 20; // add some spacing before the signature line

    // Add signature placeholders
    pdf.line(10, currentYPosition, 110, currentYPosition); // Signature line for supplier
    pdf.text("Supplier Signature:", 10, currentYPosition + 10);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    pdf.text(`Date: ${formattedDate}`, 130, currentYPosition + 10);
    currentYPosition += 15;

    // Signature line for shop representative

    // Save or display the PDF
    pdf.save("client_report.pdf"); // Save the PDF with a filename
  };

  function ViewClient(id) {
    console.log(id);
    localStorage.setItem("userID", id);
  }

  function UpdateClient(id) {
    console.log(id);
    localStorage.setItem("userID", id);
  }

  return (
    <div id="AllClient">
      <body className="AllClient">
        <main class="table">
          <section class="table__header">
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                backgroundColor: "transparent !important",
              }}
            >
              <h1 style={{ backgroundColor: "transparent !important" }}>
                Client's Details...
              </h1>{" "}
            </Link>
            <div class="input-group">
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
              />
            </div>
            <Link to="/Admin/client/add">
              <Button variant="outline-primary" size="lg">
                Add Clients
              </Button>
            </Link>
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
                <label for="export-file" id="toPDF" onClick={generatePDF}>
                  PDF <img src="/images/pdf.png" alt="" />
                </label>
              </div>
            </div>
          </section>
          <section class="table__body">
            <table id="stock-table">
              <thead>
                <tr>
                  <th>Client Name </th>
                  <th> Address </th>
                  <th> Status </th>
                  <th> System Email</th>
                  <th> No Of Branches </th>
                  <th> Option</th>
                </tr>
              </thead>

              {clients
                .filter((dataobj) => {
                  const lowerCaseSearch = search.toLowerCase();
                  const lowerCaseFirstName =
                    dataobj.ClientsfirstName.toLowerCase();
                  const lowerCaseLastName =
                    dataobj.ClientsLastName.toLowerCase();
                  const lowerCaseSystemEmail =
                    dataobj.SystemEmail.toLowerCase();
                  const NoOfBranches = dataobj.NoOfBranches;

                  return (
                    lowerCaseSearch === "" ||
                    lowerCaseFirstName.includes(lowerCaseSearch) ||
                    lowerCaseLastName.includes(lowerCaseSearch) ||
                    lowerCaseSystemEmail.includes(lowerCaseSearch) ||
                    NoOfBranches === search
                  );
                })
                .map((dataobj) => {
                  return (
                    <tbody>
                      <tr key={dataobj._id}>
                        <td>
                          {" "}
                          <img src="/images/me.jpg" alt="" />
                          {dataobj.ClientsfirstName} {dataobj.ClientsLastName}
                        </td>
                        <td>{dataobj.ClientsState}</td>

                        <td> {dataobj.ClientsStatus} </td>

                        <td>{dataobj.SystemEmail}</td>

                        <td>{dataobj.NoOfBranches}</td>

                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteClient(dataobj._id)}
                          ></button>
                          <Link to="/Admin/client/Profile/:id">
                            <button
                              className="bx bx-info-circle bx-lg btn btn-outline-primary"
                              style={{ margin: "10px" }}
                              onClick={() => ViewClient(dataobj._id)}
                            ></button>
                          </Link>

                          <Link to="/Admin/client/profile/update/:id">
                            {" "}
                            <button
                              className="bx bx-pencil bx-lg btn btn-outline-warning"
                              style={{ margin: "10px" }}
                              onClick={() => UpdateClient(dataobj._id)}
                            ></button>
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
