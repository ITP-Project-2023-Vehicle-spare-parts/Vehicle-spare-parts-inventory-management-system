import Button from "react-bootstrap/esm/Button";
import "./AllSupplier.css";
import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";

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
        window.location.reload();

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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

  const genaratePDF = useReactToPrint({
    content: () => conponentPDF.current,
    documentTitle: "Supplier List",
    onafterprint: () => alert("Data Saved In PDF"),
  });

  return (
    <div id="AllSupplier">
      <body className="AllSupplier">
        <main class="table">
          <section class="table__header">
            <h1>Supplier's Details</h1>
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
                <i className="bx bx-menu bx-sm"></i>
              </label>
              <input type="checkbox" id="export-file" />
              <div class="export__file-options">
                <label>Export As &nbsp; &#10140;</label>
                <label for="export-file" id="toPDF" onClick={genaratePDF}>
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
                  const lowerCaseBrand = dataobj.ProvidedBrand.toLowerCase();

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
                        <td> {" "}
                          <img src="/images/me.jpg" alt="" style={{margin:'10px'}}/> {''} {''}
                          {dataobj.SupplierfirstName} {dataobj.SupplierLastName}</td>
                        <td>
                         {dataobj.CompanyName}
                        </td>
                        <td>{dataobj.SupplierCity} </td>
                        <td>{dataobj.SystemEmail} </td>
                        <td>{dataobj.ProvidedBrand}</td>
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
