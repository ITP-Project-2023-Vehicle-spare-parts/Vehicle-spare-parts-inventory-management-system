// FetchClaim.js
import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FetchClaim = () => {
    const [billno, setBillno] = useState('');
    const [claimDetails, setClaimDetails] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/warrenty/get/${billno}`);
            const data = response.data;

            if (data.status === 'Claim fetched') {
                setClaimDetails(data.warrenty);
                setError(null);
            } else {
                setClaimDetails(null);
                setError('Claim not found');
            }
        } catch (error) {
            console.error('Error fetching claim details:', error);
        }
    };

    const handleUpdateClick = () => {
        if (claimDetails) {
            if (claimDetails.status === 'Under Review' || !claimDetails.status) {
                navigate(`/home/update/${claimDetails._id}/${billno}`);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'You can only update claims that are "under review" or have no  status',
                    showConfirmButton: false,
                    timer: 1500,
                    
                    
                  });
            }
        }
    };
    
    const handleDeleteClick = () => {
        if (claimDetails) {
            if (claimDetails.status === 'Under Review' || !claimDetails.status) {
                navigate(`/home/delete/${claimDetails._id}/${billno}`);
            } else {
                Swal.fire({
                    position: 'top-center',
                    icon: 'warning',
                    title: 'You can only delete claims that are "under review" or have no status',
                    showConfirmButton: false,
                    timer: 1500,
                    
                    
                  });
                
            }
        }
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
              <h1 style={{ textAlign: "left" ,paddingLeft:"90px" }}>Your claim details </h1>
          </div>
          
      <div className="container shadow-lg p-5 mb-5  rounded" style={{background:"#87CEEB"}}>

        
            <input
                type="text"
                placeholder="Enter Bill No"
                value={billno}
                onChange={(e) => setBillno(e.target.value)}
            />

            <button onClick={handleSearch}>View Claim</button>

            {error && <p>Error: {error}</p>}

            {claimDetails && (
                <div className="container shadow-lg p-5 mb-5  rounded" style={{ background: "#87CEEB"}}>
                    <div>
                        <h3>Warranty Claim Details</h3>

                        <p>productname: {claimDetails.productname}</p>
                        <p>Bill No: {claimDetails.billno}</p>
                        <p>purchasedate: {claimDetails.purchasedate}</p>
                        <p>claim added date: {claimDetails.claimdate}</p>
                        <p>Branch: {claimDetails.branch}</p>
                        <p>contactNo: {claimDetails.contactNo}</p>
                        <p>email: {claimDetails.email}</p>
                        <p>description: {claimDetails.description}</p>
                        <p>Status: {claimDetails.status}</p>

                        <div className="row justify-content-between">
                            <div className="col-4">
                                <button onClick={handleUpdateClick} className="btn btn-warning">
                                    Update
                                </button>
                            </div>

                            <div className="col-4">
                                <button onClick={handleDeleteClick} type="submit" className="btn btn-primary">
                                    Delete claim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default FetchClaim;
