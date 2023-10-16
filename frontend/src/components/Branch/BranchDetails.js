import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BranchDetails.css';
import jsPDF from 'jspdf';


function BranchDetails() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/Branch/get/${id}`)
      .then((response) => {
        const branchData = response.data.branch; // Assuming the API returns an object with a "branch" key
        setBranch(branchData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching branch details:', error);
        setLoading(false);
      });
  }, [id]);

  
    function generatePDF() {
      const pdfDoc = new jsPDF();
    
      // Set background color for the title
      pdfDoc.setFillColor(200, 200, 200); // RGB color for light gray
      pdfDoc.rect(0, 0, 210, 20, 'F'); // Fill a rectangle as the background for the title
      pdfDoc.setTextColor(0, 0, 0); // Set text color to black
      pdfDoc.setFontSize(16);
      pdfDoc.text("Branch details", 10, 15);
    
      const img = new Image();
      img.src = "/images/CMLogo.png"; // Replace with the actual image path
      pdfDoc.addImage(img, "PNG", 10, 30, 40, 40);
    
      // Define the vertical position for text
      let yPos = 100;
    
      // Iterate through the deliveryPerson object and add details to the PDF
      for (const key in branch) {
        if (Object.hasOwnProperty.call(branch, key)) {
          const value = String(branch[key]); // Ensure value is a string
          
          // Set text color to a different color (e.g., blue)
          pdfDoc.setTextColor(0, 0, 255); // RGB color for blue
          pdfDoc.text(`${key}:`, 10, yPos);
    
          // Set text color back to black for the value
          pdfDoc.setTextColor(0, 0, 0); // Set text color to black
          pdfDoc.text(value, 90, yPos);
    
          yPos += 10; // Increase vertical position for the next line
        }
      }
    
      // Save the PDF with a unique name
      const fileName = `branch_details_${branch.BranchID}.pdf`;
      pdfDoc.save(fileName);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!branch) {
    return <div>Error retrieving branch details.</div>;
  }

  return (
    <div className='branch-details-container' id='BranchDetails'>
      <h2>View Branch Details</h2>
      {/* <p>Branch ID: {branch.BranchID}</p> */}
      <p>Branch Name: {branch.BranchName}</p>
      <p>Manager ID: {branch.ManagerID}</p>
      <p>Manager Name: {branch.ManagerName}</p>
      <p>Branch Address: {branch.BranchAddress}</p>
      <p>Telephone Number: {branch.TelePhoneNumber}</p>
      <button onClick={generatePDF}>Generate Report</button>
    </div>

  );
}

export default BranchDetails;
