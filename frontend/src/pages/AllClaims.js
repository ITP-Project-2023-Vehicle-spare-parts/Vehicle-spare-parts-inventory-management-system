import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import autoTable correctly
import '../CSS/AllClaim.css'; // Import your CSS file

function AllClaims() {
  const [warrantys, setWarranty] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getClaims();
  }, []);

  const getClaims = async () => {
    try {
      const response = await axios.get('http://localhost:8000/warrenty/');
      setWarranty(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/warrenty/delete/${id}`);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Delete Successful',
        showConfirmButton: false,
        timer: 1500,
      });

      getClaims(); // Refresh the claims list after deletion
    } catch (error) {
      console.error('Error deleting claim:', error);
    }
  };

  const filteredWarrantys = warrantys.filter((claim) =>
    (claim.productname && claim.productname.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (claim.billno && claim.billno.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const generateReport = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Define the content of your report
    const header = ['Product Name', 'Bill No', 'Purchase Date', 'Claim Date', 'Branch', 'Contact No', 'Email', 'Description', 'Status'];
    const data = filteredWarrantys.map((claim) => [
      claim.productname,
      claim.billno,
      claim.purchasedate,
      claim.claimdate,
      claim.branch,
      claim.contactNo,
      claim.email,
      claim.description,
      claim.status,
    ]);

    // Set the table headers and data
    doc.autoTable({
      head: [header],
      body: data,
      startY: 50, // Adjust the starting position as needed
    });

    // Add text and styles for the report title and metadata
    doc.setFontSize(14);
    doc.text('All Claim Details', 105, 30, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Chathura Motors', 155, 5);
    doc.text('Negombo', 155, 10);
    doc.text('chathura@gmail.com', 155, 15);
    doc.text('0771268478', 155, 20);

    // Save the PDF or open it in a new tab
    doc.save('warranty_claims_report.pdf');
  };

  return (
    <div className="container">
      <h1 className="page-title" style={{ fontSize: '40px' }} >All Claims</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '300px',     // Adjust the width as needed
            height: '40px',     // Adjust the height as needed
            fontSize: '16px'   // Adjust the font size as needed
          }}
        />
      </div>

      <table className="claimtable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Bill No</th>
            <th>Purchase Date</th>
            <th>Claim Date</th>
            <th>Branch</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarrantys.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.productname}</td>
              <td>{claim.billno}</td>
              <td>{claim.purchasedate}</td>
              <td>{claim.claimdate}</td>
              <td>{claim.branch}</td>
              <td>{claim.contactNo}</td>
              <td>{claim.email}</td>
              <td>{claim.description}</td>
              <td>{claim.status}</td>

              <td>
                <Link
                  to={`/admin/updates/${claim._id}/${claim.billno}`}
                  
                  className="update"
                >
                  Update
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(claim._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generateReport} id='butt' className="report">
        Generate Report
      </button>
    </div>
  );
}

export default AllClaims;
