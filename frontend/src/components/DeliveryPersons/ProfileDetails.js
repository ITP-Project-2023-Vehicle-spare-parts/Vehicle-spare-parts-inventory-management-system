import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewProfile.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from "jspdf";
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
//import path from 'path';

function ProfileDetails() {
  const { deliveryPersonID } = useParams();
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the profile details of the selected delivery person by ID
    axios.get("http://localhost:8000/deliveryPerson/get/"+deliveryPersonID)
      .then((response) => {
        console.log(response.data);
        setDeliveryPerson(response.data.DeliveryPersons);

        // Construct the image path with different possible extensions
        const possibleExtensions = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG']; // Add more if needed

        let imageRef;
        (async () => {
          for (const ext of possibleExtensions) {
            imageRef = ref(storage, `images/${deliveryPersonID}.${ext}`);
            try {
              await getDownloadURL(imageRef);
              break; // Break the loop if the image is found
            } catch (error) {
              imageRef = null; // Reset imageRef if not found
            }
          }

          if (imageRef) {
            getDownloadURL(imageRef)
              .then((url) => {
                console.log('Image URL:', url);
                setImageUrl(url);
              })
              .catch((error) => console.error('Error getting image URL:', error));
          } else {
            console.error('No image found for the given extensions');
          }
        })();
      })
      .catch((error) => {
        console.error('Error fetching profile details:', error);
      });
  }, [deliveryPersonID]);

  function generatePDF() {
    const pdfDoc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
    // Set background color for the title
    pdfDoc.setFillColor(200, 200, 200); // RGB color for light gray
    pdfDoc.rect(0, 0, 210, 20, 'F'); // Fill a rectangle as the background for the title
    pdfDoc.setTextColor(0, 0, 0); // Set text color to black
    pdfDoc.setFontSize(16);
    pdfDoc.text(`Profile Details - ${deliveryPerson.deliverypersonname}`, 10, 15);
  
    const img = new Image();
    img.src = "/images/CMLogo.png"; // Replace with the actual image path
    pdfDoc.addImage(img, "PNG", 10, 30, 40, 40);
  
    // Define the vertical position for text
    let yPos = 100;
  
    // Iterate through the deliveryPerson object and add details to the PDF
    for (const key in deliveryPerson) {
      if (Object.hasOwnProperty.call(deliveryPerson, key)) {
        const value = String(deliveryPerson[key]); // Ensure value is a string
        
        // Set text color to a different color (e.g., blue)
        pdfDoc.setTextColor(0, 0, 255); // RGB color for blue
        pdfDoc.text(`${key}:`, 10, yPos);
  
        // Set text color back to black for the value
        pdfDoc.setTextColor(0, 0, 0); // Set text color to black
        pdfDoc.text(value, 90, yPos);
        pdfDoc.setFontSize(10);
        pdfDoc.text("In front of People's Bank,", pdfDoc.internal.pageSize.width - 60, 10);
        pdfDoc.text("Ibbagamuwa", pdfDoc.internal.pageSize.width - 60, 15);
        pdfDoc.text(`${formattedDate}`, 150, 20);
  
        yPos += 10; // Increase vertical position for the next line
      }
    }
  
    // Save the PDF with a unique name
    const fileName = `user_profile_${deliveryPerson.DeliveryPersonID}.pdf`;
    pdfDoc.save(fileName);
  }
  
  

  if (!deliveryPerson) {
    return <div>Loading...</div>;
  }

  return (
    <div id = 'profile-details' className="container">
      <div className="profile-container">
        <h2 className="profile-heading">User Profile</h2>
        <div className="profile-picture">
          <img src={imageUrl} alt="Delivery Person" />
        </div>
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="deliveryPersonID">Delivery Person ID</label>
                <input type="text" className="form-control" id="deliveryPersonID" value={deliveryPerson.DeliveryPersonID} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonUsername">User Name</label>
                <input type="text" className="form-control" id="deliverypersonUsername" value={deliveryPerson.deliverypersonUsername} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonname">Name</label>
                <input type="text" className="form-control" id="deliverypersonname" value={deliveryPerson.deliverypersonname} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonGender">Gender</label>
                <input type="text" className="form-control" id="deliverypersonGender" value={deliveryPerson.deliverypersonGender} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonDOB">Date of Birth</label>
                <input type="text" className="form-control" id="deliverypersonDOB" value={deliveryPerson.deliverypersonDOB} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonContactNumber">Contact Number</label>
                <input type="text" className="form-control" id="deliverypersonContactNumber" value={deliveryPerson.deliverypersonContactNumber} readOnly />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="deliverypersonEmail">Email</label>
                <input type="text" className="form-control" id="deliverypersonEmail" value={deliveryPerson.deliverypersonEmail} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonNIC">NIC</label>
                <input type="text" className="form-control" id="deliverypersonNIC" value={deliveryPerson.deliverypersonNIC} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonAddress">Address</label>
                <input type="text" className="form-control" id="deliverypersonAddress" value={deliveryPerson.deliverypersonAddress} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonDLN">Driver's License Number</label>
                <input type="text" className="form-control" id="deliverypersonDLN" value={deliveryPerson.deliverypersonDLN} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonDLexpire">DL Expiration Date</label>
                <input type="text" className="form-control" id="deliverypersonDLexpire" value={deliveryPerson.deliverypersonDLexpire} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="deliverypersonExperience">Experience</label>
                <input type="text" className="form-control" id="deliverypersonExperience" value={deliveryPerson.deliverypersonExperience} readOnly />
              </div>
            </div>
          </div>
          <button className="generate-pdf-btn" onClick={generatePDF}>
          Generate PDF
        </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails;
