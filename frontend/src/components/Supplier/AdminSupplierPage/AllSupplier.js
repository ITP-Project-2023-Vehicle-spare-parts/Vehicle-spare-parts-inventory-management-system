import Button from "react-bootstrap/esm/Button";
import "./AllSupplier.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toast from "react-hot-toast";

// import toast from "react-hot-toast";

export default function AllSupplier() {
  const [Suppliers, setSupplier] = useState([]);
  const [search, setSearch] = useState("");
  const conponentPDF = useRef();

  console.log(search);

  useEffect(() => {
    function getSupplier() {
      axios
        .get("http://localhost:8000/supplier/", getSupplier)
        .then((res) => {
          console.log(res.data);
          setSupplier(res.data);
          toast.success("Data Fetched Successfully!", {
            duration: 3000, // 3 seconds
            position: "top-center", // You can change the position if needed
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getSupplier();
  }, []);

  function DeleteSupplier(id) {
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
        axios.delete("http://localhost:8000/supplier/delete/" + id);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        window.location.reload();
      }
    });
  }

  function ViewSupplier(id) {
    console.log(id);
    localStorage.setItem("userID", id);
  }

  function UpdateSupplier(id) {
    console.log(id);
    localStorage.setItem("userID", id);
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add the logo
    const logoURL = '/images/CMLogo.png';
    pdf.addImage(logoURL, 'PNG', 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed
    
    // Set font styles
    pdf.setFont('helvetica');
    pdf.setFontSize(16);
  
    // Add a title
    pdf.text('Supplier Report - CMspare', 70, 20);
  
    // Create a table for client data
    const tableData = Suppliers.map((dataobj, index) => {
      return [
        `${dataobj.SupplierfirstName} ${dataobj.SupplierLastName}`,
        dataobj.SupplierCity,
        dataobj.CompanyName,
        dataobj.SupplierCity,
        dataobj.SystemEmail,
        dataobj.ProvidedCategory,
      ];
    });
  
    const tableHeaders = ['Supplier Name', 'Company Name', 'Address', 'System Email', 'Provide Category'];

    // Set the table style
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0); // Text color (black)
    
    // Add the table
    pdf.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 40, // Adjust the vertical position
      margin: { horizontal: 10 },
      columnStyles: { 0: { cellWidth: 50 } }, // Adjust the column width
      bodyStyles: { valign: 'middle' }, // Vertical alignment for cell content
      columnWidth: 'wrap',
    });

    let currentYPosition = pdf.lastAutoTable.finalY + 20; // Get the Y position of the last table row + 20 for padding

    // Add shop address
    pdf.setFontSize(14);
    pdf.text('Shop Address:Ibbagamuwa', 10, currentYPosition);
    
    const shopAddress = [
        "Chathura Moters (CM Spare)",
        "Dambulla road",
        "City : Dabulla, 60500",
        "Phone: (+94)91 2245891",
        "Email: chathuraspares@gmail.com "
    ];
    currentYPosition += 10; // Initial space before first address line

    shopAddress.forEach(line => {
        pdf.text(line, 10, currentYPosition);
        currentYPosition += 10;
    });

    currentYPosition += 20; // add some spacing before the signature line

    // Add signature placeholders
    pdf.line(10, currentYPosition, 110, currentYPosition); // Signature line for supplier
    pdf.text('Supplier Signature:', 10, currentYPosition + 10); 


    
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    pdf.text(`Date: ${formattedDate}`, 130, currentYPosition +10);
    currentYPosition += 15;

   // Signature line for shop representative
   

    // Save the updated PDF
    pdf.save('supplier_report.pdf');
};



  return (
    <div id="AllSupplier">
      <body className="AllSupplier">
        <main class="table">
          <section class="table__header">
          <Link to="/admin" style={{textDecoration:"none" ,backgroundColor:"transparent !important" }}><h1 style={{backgroundColor:"transparent !important"}}>Supplier's Details...</h1> </Link> 
            <div class="input-group">
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Data..."
              />
            </div>
            <Link to="/Admin/sup/add">
              <Button variant="outline-primary" size="lg">
                Add Suppliers
              </Button>
            </Link>
            <div class="export__file">
              <label
                for="export-file"
                class="export__file-btn"
                title="Export File"
              >
                <i className="bx bx-menu "></i>
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
            <div ref={conponentPDF} style={{ width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    <th> Supplier Name</th>
                    <th> Company Name </th>
                    <th> Address </th>
                    <th> System Email</th>
                    <th> Provided Brand </th>
                    <th> Option</th>
                  </tr>
                </thead>

                {Suppliers.filter((dataobj) => {
                  const lowerCaseSearch = search.toLowerCase();
                  const lowerCaseFirstName =
                    dataobj.SupplierfirstName.toLowerCase();
                  const lowerCaseCompanyName =
                    dataobj.CompanyName.toLowerCase();
                  const lowerCaseLastName =
                    dataobj.SupplierLastName.toLowerCase();
                  const lowerCaseSystemEmail =
                    dataobj.SystemEmail.toLowerCase();
                  const lowerCaseBrand = dataobj.ProvidedCategory.toLowerCase();

                  return (
                    lowerCaseSearch === "" ||
                    lowerCaseFirstName.includes(lowerCaseSearch) ||
                    lowerCaseLastName.includes(lowerCaseSearch) ||
                    lowerCaseSystemEmail.includes(lowerCaseSearch) ||
                    lowerCaseBrand.includes(lowerCaseSearch) ||
                    lowerCaseCompanyName.includes(lowerCaseSearch)
                  );
                }).map((dataobj) => {
                  return (
                    <tbody>
                      <tr key={dataobj._id}>
                        <td style={{textAlign:"left"  }}>
                          {" "}
                          <img
                            src="/images/me.jpg"
                            alt=""
                            style={{ margin: "10px" }}
                          />{" "}
                          {""} {""}
                          {dataobj.SupplierfirstName} {dataobj.SupplierLastName}
                        </td>
                        <td>{dataobj.CompanyName}</td>
                        <td>{dataobj.SupplierCity} </td>
                        <td>{dataobj.SystemEmail} </td>
                        <td>{dataobj.ProvidedCategory}</td>
                        <td style={{ marginLeft: "auto" }}>
                          <button
                            className="bx bx-trash bx-lg btn btn-outline-danger"
                            style={{ margin: "10px" }}
                            onClick={() => DeleteSupplier(dataobj._id)}
                          ></button>
                          <Link to="/Admin/Sup/Profile/id">
                            <button
                              className="bx bx-info-circle bx-lg btn btn-outline-primary"
                              style={{ margin: "10px" }}
                              onClick={() => ViewSupplier(dataobj._id)}
                            ></button>
                          </Link>

                          <Link to="/Admin/profile/update/id">
                            <button
                              className="bx bx-pencil bx-lg btn btn-outline-warning"
                              style={{ margin: "10px" }}
                              onClick={() => UpdateSupplier(dataobj._id)}
                            ></button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </section>
        </main>
      </body>
    </div>
  );
}
