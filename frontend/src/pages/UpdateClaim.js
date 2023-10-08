// UpdateClaim.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function UpdateClaim() {
    const { billno, id } = useParams(); // Use billno for fetching details and id for updating
    const navigate = useNavigate();

    const [claimDetails, setClaimDetails] = useState({
        productname: '',
        email: '',
        purchasedate: '',
        claimdate: '',
        branch:'',
        description: '',
        status: '',
        contactNo: ''
    });
    
    

    useEffect(() => {
        const fetchClaimDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/warrenty/get/${billno}`);
                setClaimDetails(response.data.warrenty);
            } catch (error) {
                console.error('Error fetching claim details:', error);
            }
        };

        fetchClaimDetails();
    }, [billno]);

   

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = (today.getMonth() + 1).toString().padStart(2, '0');
        let day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    const handleUpdate = async () => {
       
        
        try {
            await axios.put(`http://localhost:8000/warrenty/update/${id}`, claimDetails);
            console.log('Claim details updated');
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'update Successful',
                showConfirmButton: false,
                timer: 1500
              })
              
            navigate('/home/get/:billno'); // Navigate back to the list of all claims or any desired page
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
              <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>update Warranty claim</h1>
          </div>
          
      <div className="container shadow-lg p-3 mb-5  rounded" style={{background:"#87CEEB"}}>

        
    
            <form>
                <div className="mb-3 text-white">
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

                <div className="mb-3 text-white">
                    <label htmlFor="billno">Bill No</label>
                    <input
                        type="text"
                        className="form-control"
                        id="billno"
                        name="billno"
                        value={claimDetails.billno}
                        disabled
                    />
                </div>

                <div className="mb-3 text-white">
            <label htmlFor="date">Purchase Date:</label>
            <input
              type="date"
              className="form-control"
              id="purchasedate"
              name="purchasedate"
              placeholder="MM/DD/YYYY"
              max={getCurrentDate()}
              value={claimDetails.purchasedate}
              onChange={handleChange}
            
            
            />
          </div>
          <div className="mb-3 text-white">
            <label htmlFor="date" >Claim Added Date:</label>
            <input
              type="date"
              className="form-control"
              id="claimdate"
              name="claimdate"
              placeholder="MM/DD/YYYY"
              min={getCurrentDate()}
              required
              value={claimDetails.claimdate}
              onChange={handleChange}
            
            
            />
          </div>

          <div className="mb-3 text-white">
                    <label htmlFor="branchname">Branch Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="branch"
                        name="branch"
                        value={claimDetails.branch}
                        onChange={handleChange}
                    />
                </div>
          <div className="mb-3 text-white">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
    
              required
              value={claimDetails.email}
              onChange={handleChange}
              
            
            
            />
          </div>
          <div className="mb-3 text-white">
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
                <div className="mb-3 text-white">
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
