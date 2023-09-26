// UpdateClaim.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateClaim() {
    const { billno, id } = useParams(); // Use billno for fetching details and id for updating
    const navigate = useNavigate();

    const [claimDetails, setClaimDetails] = useState({
        productname: '',
        email: '',
        purchasedate: '',
        claimdate: '',
        description: '',
        status: '',
        contactNo: ''
    });

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8030/warrenty/get/${billno}`);
                setClaimDetails(response.data.warrenty);
            } catch (error) {
                console.error('Error fetching claim details:', error);
            }
        };

        fetchClaimDetails();
    }, [billno]);

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8030/warrenty/update/${id}`, claimDetails);
            console.log('Claim details updated');
            alert("Claim updated");
            navigate('/'); // Navigate back to the list of all claims or any desired page
        } catch (error) {
            console.error('Error updating claim details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimDetails((prevClaimDetails) => ({
            ...prevClaimDetails,
            [name]: value,
        }));
    };

    return (
        <div style={{ 
     
            backgroundSize: 'cover',
            minHeight: '150vh',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            
        }}>
        <div className="col-lg-9-mt-2 mb-2 p-3 pt-4 text-black">
              <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Add New Warranty</h1>
          </div>
          
      <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#225894"}}>

        
    
            <form>
                <div className="form-group">
                    <label htmlFor="productname">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productname"
                        name="productname"
                        value={claimDetails.productname}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="billno">Bill No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="billno"
                        name="billno"
                        value={claimDetails.billno}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
            <label htmlFor="date">Purchase Date:</label>
            <input
              type="date"
              className="form-control"
              id="purchasedate"
              name="purchasedate"
              placeholder="MM/DD/YYYY"
        
              value={claimDetails.purchasedate}
              onChange={handleChange}
            
            
            />
          </div>
          <div className="form-group">
            <label htmlFor="date" >Claim Added Date:</label>
            <input
              type="date"
              className="form-control"
              id="claimdate"
              name="claimdate"
              placeholder="MM/DD/YYYY"
              required
              value={claimDetails.claimdate}
              onChange={handleChange}
            
            
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="MM/DD/YYYY"
              required
              value={claimDetails.email}
              onChange={handleChange}
            
            
            />
          </div>
          <div className="form-group">
                    <label htmlFor="contactno">Contact No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactno"
                        name="contactNo"
                        value={claimDetails.contactNo}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={claimDetails.description}
                        onChange={handleChange}
                    />
                </div>






                {/* Add similar input fields for other claim details */}
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    Update
                </button>
            </form>
        </div>
        </div>
        
    );
}

export default UpdateClaim;
