import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function DeleteClaim() {
    const { id,billno } = useParams();
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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/warrenty/delete/${id}`);
            console.log('Claim deleted');
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Delete Successful',
                showConfirmButton: false,
                timer: 1500
              })
              
            navigate('/home'); // Navigate back to the list of all claims or any desired page
        } catch (error) {
            console.error('Error deleting claim:', error);
        }
    };

    return (
        <div className="container shadow-lg p-3 mb-5  rounded" style={{ background: "#87CEEB" }}>
            <h2>Delete Claim</h2>
            <div>
                
                <p>Product Name: {claimDetails.productname}</p>
                <p>Bill No: {claimDetails.billno}</p>
                <p>Purchase Date: {claimDetails.purchasedate}</p>
                <p>Claim added Date: {claimDetails.claimdate}</p>
                <p>Branch name: {claimDetails.branch}</p>
                <p>Contact No: {claimDetails.contactNo}</p>
                <p>Email: {claimDetails.email}</p>
                <p>Description: {claimDetails.description}</p>
                <p>Status: {claimDetails.status}</p>
            </div>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
}

export default DeleteClaim;
