import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OfferDetails.css';
import jsPDF from 'jspdf';

function OfferDetails() {
  const { offerID } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/offers/getOffer/${offerID}`)
      .then((response) => {
        const offerData = response.data;
        console.log("Offer Data:", offerData); // Log the entire offer object
        setOffer(offerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching offer details:', error);
        setLoading(false);
      });
  }, [offerID]);

  function generatePDF() {
    const pdfDoc = new jsPDF();
  
    // Set background color for the title
    pdfDoc.setFillColor(200, 200, 200); // RGB color for light gray
    pdfDoc.rect(0, 0, 210, 20, 'F'); // Fill a rectangle as the background for the title
    pdfDoc.setTextColor(0, 0, 0); // Set text color to black
    pdfDoc.setFontSize(16);
    pdfDoc.text("Offer details", 10, 15);
  
    const img = new Image();
    img.src = "/images/CMLogo.png"; // Replace with the actual image path
    pdfDoc.addImage(img, "PNG", 10, 30, 40, 40);
  
    // Define the vertical position for text
    let yPos = 100;
  
    // Iterate through the deliveryPerson object and add details to the PDF
    for (const key in offer) {
      if (Object.hasOwnProperty.call(offer, key)) {
        const value = String(offer[key]); // Ensure value is a string
        
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
    const fileName = `offer_details_${offer.offerID}.pdf`;
    pdfDoc.save(fileName);
};

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!offer) {
    return <div>Error retrieving offer details.</div>;
  }

//   const productId = offer.productID;
// if (!productId) {
//   return <div>Product ID not found.</div>;
// }

  return (
    <div className='offer-details-container'id='OfferDetails'>
      <h2>Offer Details</h2>
      {/* <p>Product ID: {offer.productID}</p> */}
      <p>Offer ID: {offer.offerID}</p>
      <p>Rate: {offer.rate}</p>
      <p>Description: {offer.description}</p>
      {/* Add other fields as needed */}
      <button onClick={generatePDF}>Generate Report</button>
    </div>
  );
}

export default OfferDetails;
