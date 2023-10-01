import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
 // Import autoTable correctly

function AllClaims() {
  const [warrantys, setWarranty] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getclaims();
  }, []);

  const getclaims = async () => {
    try {
      const response = await axios.get('http://localhost:8000/warrenty/');
      setWarranty(response.data);
    } catch (error) {
      console.error('Error fetching claim:', error);
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

      getclaims(); // Refresh the student list after deletion
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
    const header = ['Product Name', 'Bill No', 'Purchase Date', 'Claim Date', 'Contact No', 'Email', 'Description', 'Status'];
    const data = filteredWarrantys.map((claim) => [
      claim.productname,
      claim.billno,
      claim.purchasedate,
      claim.claimdate,
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

      
      // Add image at the top
      //doc.addImage(process.env.PUBLIC_URL + '../LOGO.png', "PNG", 10, 10, 70, 35);

      doc.text("All Claim Details", 85, 35);
      doc.setFontSize(9);
      doc.text("Chathura Motors", 155, 5);
      doc.text("Negombo", 155, 10);
      doc.text("chathura@gmail.com", 155, 15);
      doc.text("0771268478", 155, 20);

    // Save the PDF or open it in a new tab
    doc.save('warranty_claims_report.pdf');
  };

  return (
    <div className="container">
      <h1>All Claims</h1>

      <div>
        <input
          type="text"
          placeholder="Search by product name or bill no"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Product Name</th>
            <th style={tableHeaderStyle}>Bill No</th>
            <th style={tableHeaderStyle}>Purchase Date</th>
            <th style={tableHeaderStyle}>Claim Date</th>
            <th style={tableHeaderStyle}>Contact No</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Description</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarrantys.map((claim) => (
            <tr key={claim._id}>
              <td style={tableCellStyle}>{claim.productname}</td>
              <td style={tableCellStyle}>{claim.billno}</td>
              <td style={tableCellStyle}>{claim.purchasedate}</td>
              <td style={tableCellStyle}>{claim.claimdate}</td>
              <td style={tableCellStyle}>{claim.contactNo}</td>
              <td style={tableCellStyle}>{claim.email}</td>
              <td style={tableCellStyle}>{claim.description}</td>
              <td style={tableCellStyle}>{claim.status}</td>

              <td style={tableCellStyle}>
                <Link
                  to={`/admin/updates/${claim._id}/${claim.billno}`}
                  className="btn btn-warning"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(claim._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generateReport} className="btn btn-primary">
        Generate Report
      </button>
    </div>
  );
}

const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  background: '#f2f2f2',
  textAlign: 'center',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '4px',
  textAlign: 'center',
};

export default AllClaims;