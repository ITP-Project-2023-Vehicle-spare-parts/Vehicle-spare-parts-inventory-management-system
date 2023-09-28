import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './BranchTable.css'; // Import your CSS file here

function BranchTable() {
    const [branches, setBranches] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // Fetch the list of branches from your API
        axios.get('http://localhost:8000/Branch/')
            .then((response) => {
                setBranches(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleDelete = (id) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this branch?');

        if (isConfirmed) {
            // Send a DELETE request to your API endpoint
            axios.delete(`http://localhost:8000/Branch/delete/${id}`)
                .then((response) => {
                    // Update the state to remove the deleted branch
                    setBranches(branches.filter((branch) => branch._id !== id));
                    alert('Branch deleted successfully!');
                })
                .catch((error) => {
                    console.error('Error deleting branch:', error);
                });
        }
    };

    return (
        <div className="branch-table-container" id='BranchTable'>
            <h2>Branch List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Branch ID</th>
                        <th>Branch Address</th>
                        {/* Add table headers for other attributes */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map((branch) => (
                        <tr key={branch.BranchID}>
                            <td>{branch.BranchID}</td>
                            <td>{branch.BranchAddress}</td>
                            {/* Add table cells for other attributes */}
                            <td>
                                <Link to={`/branch/profile/${branch._id}`}>
                                    View Branch
                                </Link>
                            </td>
                            <td>
                                <Link to={`/profile/update/${branch._id}`}>
                                    Edit Profile
                                </Link>
                            </td>
                            <td>
                                {/* Use onClick to trigger the delete action */}
                                <button onClick={() => handleDelete(branch._id)}>
                                    Delete Branch
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BranchTable;
