import SupplierSideNavigation from "../../SupplierSideNavigation";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ShipmentReport.css';
import toast from "react-hot-toast";
import Swal from "sweetalert2";


export default function ShipmentReport() {

    const [supplierReq , setRequst] = useState([]);

    useEffect(() => {
        function getRequest() {
          axios
            .get("http://localhost:8000/supplierReq/requestlist", getRequest)
            .then((res) => {
              console.log(res.data);
              setRequst(res.data);
              toast.success("Data Fetched Successfully!", {
                duration: 3000, // 3 seconds
                position: "top-right", // You can change the position if needed
              });
            })
            .catch((err) => {
             console.log(err.message);
            });
        }
        getRequest();
      }, []);
      
function DeleteRequest() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "green",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:8000/supplierReq/deleteAll/");
  
          Swal.fire("Deleted!", "Your Request has been Clear...", "success");
  
          window.location.reload();
        }
      });
}
    const generatePDF = () => {
        const pdf = new jsPDF();
        
        // Add the logo
        const logoURL = '/images/CMLogo.png';
        pdf.addImage(logoURL, 'PNG',  10, 10, 50, 20); // Adjust the coordinates and dimensions as needed
        
        // Set font styles
        pdf.setFont('helvetica');
        pdf.setFontSize(16);
      
        // Add a title
        pdf.text('Suggest Shipment Report - CMspare', 80, 30);
      
        // Create a table for client data
        const tableData = supplierReq.map((dataobj, index) => {
          return [
            `${dataobj.dayAdded}-${dataobj.monthAdded}-${dataobj.yearAdded}`,
            dataobj.suppliername,
            dataobj.productname,
            dataobj.stockQuantity,
            dataobj.reorderpoint,
            dataobj.neededStockQuantity,
          ];
        });
      
        const tableHeaders = ['Added Date', 'Supplier Name', 'Product Name','Stock Quantity', 'Reorderpoint', 'Needed StockQuantity'];
      
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
          bodyStyles: { valign: 'middle' }, // Vertical alignment for cell content
          columnWidth: 'wrap',
        });
      
        // Save or display the PDF
        pdf.save('Suggest-Order_report.pdf'); // Save the PDF with a filename
      };

    return(
        <div id="ShipmentReport">
        <body className="ShipmentReport">
            <SupplierSideNavigation/>
          <main class="table">
            <section class="table__header">
              <h1>Suggest Order Report</h1>
             
              <Link to="">
                <Button variant="outline-danger " size="lg" onClick={DeleteRequest} >
                <i class='bx bxs-trash bx-md bx-tada'>Clear Report</i>  
                </Button></Link>
                <Link to="">
                <Button variant="outline-success " size="md"  style={{marginLeft:"0px"}}>
                <i class='bx bx-pen bx-sm'>UpdateOrder</i>  
                </Button></Link>
              

              
              
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
                            <h2 style={{color:"GrayText"}}>No data available.</h2>
                        ) : (
                            <table>
                  <thead>
                    <tr>
                        <th>Added Date</th>
                      <th> Supplier Name</th>
                      <th> Product Name </th>
                      <th> Stock Quantity </th>
                      <th> Reorderpoint</th>
                      <th> Needed StockQuantity </th>

                     
                    </tr>
                  </thead>
  
                  {supplierReq.map((dataobj) => {
                    return (
                      <tbody>
                        <tr key={dataobj._id}>
                          
                        <td>{dataobj.dayAdded}-{dataobj.monthAdded}-{dataobj.yearAdded}</td>
                        <td> {dataobj.suppliername}
                          </td>
                          <td>{dataobj.productname}</td>
                          <td>{dataobj.stockQuantity} </td>
                          <td>{dataobj.reorderpoint} </td>
                          <td style={{backgroundColor:"red" , color:"white"}}>{dataobj.neededStockQuantity}</td>
                        
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
                        )}
                
              
            </section>
          </main>
        </body>
      </div>
    )
}