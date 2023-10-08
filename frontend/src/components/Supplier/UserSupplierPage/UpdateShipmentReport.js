import SupplierSideNavigation from "../../SupplierSideNavigation";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import "boxicons/css/boxicons.min.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./UpdateShipmentReport.css";
import toast from "react-hot-toast";
import { Link} from "react-router-dom";

export default function UpdateShipmentReport() {
  const [supplierReq, setRequst] = useState([]);
  const [updatedStockQuantities, setUpdatedStockQuantities] = useState({});
 

  useEffect(() => {
    function getRequest() {
      axios
        .get("http://localhost:8000/supplierReq/requestlist")
        .then((res) => {
          console.log(res.data);
          setRequst(res.data);
          toast.success("Data Fetched Successfully!", {
            duration: 3000,
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    getRequest();
  }, []);



  const handleChange = (productId, newValue) => {
    setUpdatedStockQuantities((prevState) => ({
      ...prevState,
      [productId]: newValue,
    }));
  };

  const handleSaveOrder = () => {
    // Here, you can send a request to update the stock quantities for all products using the updatedStockQuantities state.
    // Iterate through the entries in the updatedStockQuantities object and send individual requests.

    Object.entries(updatedStockQuantities).forEach(([productId, newValue]) => {
      axios
        .put(`http://localhost:8000/supplierReq/quantity/${productId}`, {
          neededStockQuantity: newValue,
        })
        .then((res) => {
          console.log(res.data);
          // Handle success, e.g., show a success message
          toast.success("Stock Quantity Updated Successfully!", {
            duration: 3000,
            position: "top-right",
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
          // Handle error, e.g., show an error message
          toast.error("Error updating Stock Quantity", {
            duration: 3000,
            position: "top-right",
          });
        });
    });
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    // Add the logo
    const logoURL = "/images/CMLogo.png";
    pdf.addImage(logoURL, "PNG", 10, 10, 50, 20); // Adjust the coordinates and dimensions as needed

    // Set font styles
    pdf.setFont("helvetica");
    pdf.setFontSize(16);

    // Add a title
    pdf.text("Suggest Shipment Report - CMspare", 80, 30);

    // Create a table for client data
    const tableData = supplierReq.map((dataobj, index) => {
      return [
        `${dataobj.dayAdded}-${dataobj.monthAdded}-${dataobj.yearAdded}`,
        dataobj.suppliername,
        dataobj.productname,
        dataobj.neededStockQuantity,
      ];
    });

    const tableHeaders = [
      "Added Date",
      "Supplier Name",
      "Product Name",
      "Needed StockQuantity",
    ];

    // Set the table style
    pdf.setFontSize(16);
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

    // Save or display the PDF
    pdf.save("Suggest-Order_report.pdf"); // Save the PDF with a filename
  };

  return (
    <div id="UpdateShipmentReport">
      <body className="UpdateShipmentReport">
        <SupplierSideNavigation />
        <main class="table">
          <section class="table__header">
            <h1>Update Order Report</h1>

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
            {supplierReq.length === 0 ? (
              <h2 style={{ color: "GrayText" }}>No data available.</h2>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th> Product Name </th>
                    <th> Needed StockQuantity </th>
                  </tr>
                </thead>
                <tbody>
                  {supplierReq.map((dataobj) => {
                    return (
                      <tr key={dataobj._id}>
                        <td>{dataobj.productname}</td>
                        <td>
                          <input
                            type="number"
                            name={`neededStockQuantity-${dataobj._id}`}
                            id={`neededStockQuantity-${dataobj._id}`}
                            value={
                              updatedStockQuantities[dataobj._id] ||
                              dataobj.neededStockQuantity
                            }
                            min={dataobj.neededStockQuantity}
                            onChange={(e) =>
                              handleChange(dataobj._id, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <Link to="/supplier/order">
              {" "}
              <Button
                variant="outline-danger "
                size="md"
                style={{ margin: "10px", float: "right" }}
              >
                <i className="bx bx-book bx-sm">SuggestReport</i>
              </Button>{" "}
            </Link>

            <Link to="">
              <Button
                variant="outline-success "
                size="md"
                style={{ margin: "10px", float: "right" }}
                onClick={handleSaveOrder}
              >
                <i className="bx bx-pen bx-sm">SaveOrder</i>
              </Button>
            </Link>
          </section>
        </main>
      </body>
    </div>
  );
}
