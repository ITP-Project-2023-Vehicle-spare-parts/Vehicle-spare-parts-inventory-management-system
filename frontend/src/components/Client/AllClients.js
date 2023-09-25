import Button from "react-bootstrap/esm/Button";
import "./AllClient.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jspdf-autotable

export default function AllSupplier() {
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
    pdf.text('Supplier Report-CMspare', 10, 10);
   

    const logoURL = '/images/CMLogo.png'; // Replace with the actual path or URL
    pdf.addImage(logoURL,'PNG', 0.1, 0.1, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()); // Adjust the coordinates and dimensions as needed
  
    // Create a new table for PDF generation without the "Option" column
    const tableData = clients.map((dataobj) => {
      return {
        'Client Name': `${dataobj.ClientsfirstName} ${dataobj.ClientsLastName}`,
        'Address': dataobj.ClientsCity,
        'Status': dataobj.ClientsStatus,
        'System Email': dataobj.SystemEmail,
        'No Of Branches': dataobj.NoOfBranches,
      };
    });
  
    // Define columns for the PDF table
    const columns = Object.keys(tableData[0]);
  
    // Generate the PDF table
    pdf.autoTable({
      head: [columns],
      body: tableData.map((data) => Object.values(data)),
    });
  
    // Save the PDF with a specific name
    pdf.save('Supplier_Details_report.pdf');
  };
  
  return (
    <div id="AllClient">
      <body className="AllClient">
        <main class="table">
          <section class="table__header">
            <h1>Client's Details</h1>
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
                        <td>{dataobj.ClientsCity}</td>

                        <td> {dataobj.ClientsStatus} </td>

                        <td>{dataobj.SystemEmail}</td>

                        <td>{dataobj.NoOfBranches}</td>

                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteClient(dataobj._id)}
                          ></button>
                          <button
                            className="bx bx-info-circle bx-lg btn btn-outline-primary"
                            style={{ margin: "10px" }}
                          ></button>
                          <button
                            className="bx bx-pencil bx-lg btn btn-outline-warning"
                            style={{ margin: "10px" }}
                          ></button>
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
