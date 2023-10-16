import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './BranchTable.css'; 

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
            <div class="btn-container">
            <Link to="/admin/branch/add">
              <button className="btn btn-primary" style={{ marginBottom: '10px' }}>
               Add Branch
              </button>
             </Link>
             <Link to="/admin/assignBranch">
              <button className="btn btn-primary" style={{ marginBottom: '10px' }}>
               Assign Bill
              </button>
             </Link>
             <Link to="/admin/branchSales">
              <button className="btn btn-primary" style={{ marginBottom: '10px' }}>
               Branch Sales
              </button>
             </Link>
             </div>
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
                            <td>
                            {/* Add table cells for other attributes */}
                            <button
                              className="bx bx-trash btn btn-outline-danger icon-lg"
                              style={{ margin: "1px" }}
                              onClick={() => handleDelete(branch._id)}
                        ></button>
                        <Link to={`/admin/branch/profile/${branch._id}`}>
                          <button
                            className="bx bx-info-circle btn btn-outline-primary icon-lg"
                            style={{ margin: "5px" }}
                          ></button>
                        </Link>
                        <Link to={`/admin/branch/update/${branch._id}`}>
                          <button
                            className="btn btn-outline-warning"
                            style={{ margin: "2px" }}>
                            <i
                            className="bx bx-pencil"
                            style={{ fontSize: "1rem" }}
                            ></i>
                          </button>
                            </Link>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BranchTable;
