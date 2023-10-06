import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./CouponTable.css";

function CouponTable() {
  const [coupons, setCoupons] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the list of coupons from your API when the component mounts
    axios
      .get("http://localhost:8000/coupon/")
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
      });
  }, [id]);

  const handleDelete = (id) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (isConfirmed) {
      // Send a DELETE request to your API endpoint
      axios
        .delete(`http://localhost:8000/coupon/delete/${id}`)
        .then((response) => {
          // Update the state to remove the deleted coupon
          setCoupons(coupons.filter((coupon) => coupon._id !== id));
          alert("Coupon deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting coupon:", error);
        });
    }
  };

  return (
    <div className="coupon-table-container" id="CouponTable">
      <h2>Coupon List</h2>
      <Link to="/admin/coupon/add">
        <button className="btn btn-primary" style={{ marginBottom: "10px" }}>
          Add Coupon
        </button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Coupon Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.code}</td>
              <td>{coupon.description}</td>
              <td>
                <button
                  className="bx bx-trash btn btn-outline-danger icon-lg"
                  style={{ margin: "5px" }}
                  onClick={() => handleDelete(coupon._id)}
                ></button>
                <Link to={`/admin/coupon/profiles/${coupon._id}`}>
                  <button
                    className="bx bx-info-circle btn btn-outline-primary icon-lg"
                    style={{ margin: "5px" }}
                  ></button>
                </Link>
                <Link to={`/admin/coupon/profiles/update/${coupon._id}`}>
                  <button
                    className="btn btn-outline-warning"
                    style={{ margin: "5px" }}
                  >
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

export default CouponTable;
