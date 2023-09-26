

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function AllClaims() {
    const [warrantys, setWarranty] = useState([]);

    useEffect(() => {
        getclaims();
    }, []);

    const getclaims = async () => {
        try {
            const response = await axios.get('http://localhost:8030/warrenty/');
            setWarranty(response.data);
        } catch (error) {
            console.error('Error fetching claim:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8030/warrenty/delete/${id}`);
            alert('claim deleted');
            getclaims(); // Refresh the student list after deletion
        } catch (error) {
            console.error('Error deleting claim:', error);
        }
    };

    return (
        <div className="container">
            <h1>All Claims</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>product name</th>
                        <th style={tableHeaderStyle}>bill no</th>
                        <th style={tableHeaderStyle}>purchase date</th>
                        <th style={tableHeaderStyle}>claim added date</th>
                        <th style={tableHeaderStyle}>Contactno</th>
                        <th style={tableHeaderStyle}>email</th>
                        <th style={tableHeaderStyle}>description</th>
                        <th style={tableHeaderStyle}>Status</th>
                        <th style={tableHeaderStyle}>action</th>


                    </tr>
                </thead>
                <tbody>
                    {warrantys.map((claim) => (
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
                                <Link to={`/updates/${claim._id}/${claim.billno}`} className="btn btn-warning">Update</Link>
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
        </div>
    );
}

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    background: '#f2f2f2',
    textAlign: 'left',
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
};

export default AllClaims;
